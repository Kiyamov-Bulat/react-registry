import {
    createContext,
    useContext,
    useEffect,
    useId,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { TableModel } from '../../../models';
import { TableEntity } from '../../../models/types';
import { useLazyRef } from '../../../lib';

export type TableContext = {
    tableModel: TableModel;
};

export const tableContext = createContext<TableContext>({
    tableModel: {} as TableModel,
});

export const useTableContext = () => useContext(tableContext);

export const useTableEntity = <T extends TableEntity>(
    init: (tableModel: TableModel) => T
): T => {
    const { tableModel } = useTableContext();
    const entity = useLazyRef(() => init(tableModel));

    useEffect(() => {
        return () => entity.current?.destroy();
    }, []);

    return entity.current;
};
