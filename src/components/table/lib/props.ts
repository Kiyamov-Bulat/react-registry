import { useLayoutEffect, useState } from 'react';
import {
    TableEntity,
    TableEntityEvent,
    TableEntityProps,
} from '../../../models';

export const useTableEntityProps = <TFrom extends TableEntityProps, TTo>(
    tableEntity: TableEntity | null | undefined,
    selector: (props: TFrom | undefined) => TTo
) => {
    const getPropsSlice = () => selector(tableEntity?.getProps() as TFrom);

    const [state, setState] = useState(getPropsSlice);

    useLayoutEffect(() => {
        const setSlice = () => {
            setState((prevSlice) => getPropsSlice() ?? prevSlice);
        };

        setSlice();

        tableEntity?.on(TableEntityEvent.UPDATE_PROPS, setSlice);

        return () => {
            tableEntity?.off(TableEntityEvent.UPDATE_PROPS, setSlice);
        };
    }, [tableEntity, selector]);

    return state;
};
