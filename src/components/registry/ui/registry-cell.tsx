import React from 'react';
import { RenderCellProps } from '../types';
import { Table } from '../../table';

export const RegistryCell = <T extends object = object>({
    value,
    columnKey,
    rowIndex,
    colIndex,
    children,
}: RenderCellProps<T>) => {
    return (
        <Table.Cell
            key={String(columnKey)}
            data-cell={String(columnKey)}
            data-row-index={rowIndex}
            data-col-index={colIndex}
            colIndex={colIndex}
            rowIndex={rowIndex}
        >
            {children ?? value}
        </Table.Cell>
    );
};
