import { FC, useCallback, useRef } from 'react';
import { CellProps } from '../../types';
import {
    useTableContext,
    useTableEntity,
    useTableEntityProps,
} from '../../lib';
import { TableEntityProps } from '../../../../models';

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
            .getOrCreateRow({ props: { index: rowIndex } })
            .createCell({ ref, props: { index: colIndex } })
    );

    const width = useTableEntityProps(
        tableModel.getOrCreateHeader().getChildByIndex(colIndex),
        useCallback((props?: TableEntityProps) => props?.width, [])
    );

    return (
        <div ref={ref} style={{ width }} data-component={'cell'} {...restProps}>
            {children}
        </div>
    );
};
