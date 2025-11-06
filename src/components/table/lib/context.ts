import { createContext, useContext, useEffect } from 'react';
import { TableEntity, TableModel } from './models';
import { useLazyRef } from '@/lib';
import { TableLayout } from '../types';

export type TableContext = {
    tableModel: TableModel;
    layoutMode: TableLayout;
};

export const tableContext = createContext<TableContext>({
    tableModel: {} as TableModel,
    layoutMode: 'fixed',
});

export const useTableContext = () => useContext(tableContext);

export const useTableEntity = <T extends TableEntity>(
    init: (tableModel: TableModel) => T
): T => {
    const { tableModel } = useTableContext();
    const entity = useLazyRef(() => init(tableModel));

    useEffect(() => {
        entity.current.restore();

        return () => {
            entity.current?.destroy();
        };
    }, []);

    return entity.current;
};
