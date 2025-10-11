import { FC, useCallback, useRef } from 'react';
import { CellProps } from '../../types';
import { TableEntityProps } from '../../../../models/types';
import {
    useTableContext,
    useTableEntity,
    useTableEntityProps,
} from '../../lib';

export const Cell: FC<CellProps> = ({
    colIndex,
    rowIndex,
    children,
    ...restProps
}) => {
    const { tableModel } = useTableContext();
    const ref = useRef<HTMLDivElement>(null);
    const cellModel = useTableEntity((tableModel) =>
        tableModel
            .getOrCreateBody()
            .getOrCreateRow(rowIndex)
            .getOrCreateCell(colIndex, ref)
    );

    const width = useTableEntityProps(
        tableModel.getHeader()?.getChild?.(colIndex),
        useCallback((props?: TableEntityProps) => props?.width, [])
    );

    return (
        <div ref={ref} style={{ width }} data-component={'cell'} {...restProps}>
            {children}
        </div>
    );
};
