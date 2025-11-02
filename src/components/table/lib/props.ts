import {
    NullableTableEntity,
    NullableTableEntityWithChildren,
    TableEntityEvent,
} from '../../../models';
import { EmitterSelector, useEmitter } from './emitter';
import { useCallback, useLayoutEffect, useState } from 'react';
import { useTableEntityChildren } from './context';

type UseTableEntityPropsOptions<T> = {
    selector: EmitterSelector<T>;
    enabled?: boolean;
};

export const useTableEntityProps = <TTo>(
    tableEntity: NullableTableEntity,
    { enabled, selector }: UseTableEntityPropsOptions<TTo>
) => {
    const selectorWrapper = useCallback(
        () => selector(tableEntity?.getProps()),
        [selector, tableEntity]
    );

    return useEmitter({
        event: TableEntityEvent.UPDATE_PROPS,
        tableEntity,
        selector: selectorWrapper,
        enabled,
    });
};

export const useTableEntityChildrenProps = <TTo>(
    tableEntity: NullableTableEntityWithChildren,
    { enabled, selector }: UseTableEntityPropsOptions<TTo>
) => {
    const childList = useTableEntityChildren(tableEntity) || [];
    const getPropsList = () => childList.map((child) => child.getProps());
    const [state, setState] = useState(() => selector(getPropsList()));

    useLayoutEffect(() => {
        if (!enabled) return;

        const propsList = getPropsList();
        const offList: (() => void)[] = [];

        for (let i = 0; i < propsList.length; ++i) {
            const child = childList[i];
            const setStateWrapper = () =>
                setState((prevState) => {
                    const newPropsList = [...propsList];

                    newPropsList[i] = child.getProps() ?? newPropsList[i];
                    return selector(newPropsList) ?? prevState;
                });

            child.on(TableEntityEvent.UPDATE_PROPS, setStateWrapper);
            offList.push(() =>
                child.off(TableEntityEvent.UPDATE_PROPS, setStateWrapper)
            );
        }

        setState(selector(propsList));

        return () => offList.forEach((off) => off());
    }, [childList, selector, enabled]);

    return state;
};
