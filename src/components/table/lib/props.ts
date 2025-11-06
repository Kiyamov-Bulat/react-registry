import {
    NullableTableEntity,
    NullableTableContainer,
    TableEntityEvent,
} from './models';
import { EmitterSelector, useEmitter } from './emitter';
import { useCallback, useLayoutEffect, useState } from 'react';

type UseTableEntityPropsOptions<T> = {
    selector: EmitterSelector<T>;
    enabled?: boolean;
};
type UseTableEntityChildrenOptions = {
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

export const useTableEntityChildren = (
    entity: NullableTableContainer,
    { enabled }: UseTableEntityChildrenOptions = {}
) => {
    const getChildren = useCallback(() => entity?.getChildren(), [entity]);

    return useEmitter({
        event: TableEntityEvent.UPDATE_CHILDREN,
        tableEntity: entity,
        selector: getChildren,
        enabled,
    });
};

export const useTableEntityChildrenProps = <TTo>(
    tableEntity: NullableTableContainer,
    { enabled, selector }: UseTableEntityPropsOptions<TTo>
) => {
    const childList = useTableEntityChildren(tableEntity, { enabled });
    const getPropsList = () => childList?.map((child) => child.getProps());
    const [state, setState] = useState(() => selector(getPropsList()));

    useLayoutEffect(() => {
        if (!enabled || !childList) return;

        const propsList = getPropsList() || [];
        const offList: (() => void)[] = [];

        for (let i = 0; i < propsList.length; ++i) {
            const child = childList[i];
            const setStateWrapper = () => {
                const update = () => {
                    const newPropsList = [...propsList];

                    newPropsList[i] = child.getProps();
                    setState(selector(newPropsList));
                };

                queueMicrotask(update);
            };

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
