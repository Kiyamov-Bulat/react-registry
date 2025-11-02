import { FC } from 'react';
import { CellProps } from '../../types';
import { useTableEntity } from '../../lib';
import { useTableCellStyle } from '../../lib/cell';

export const Cell: FC<CellProps> = ({
    colIndex,
    rowIndex,
    children,
    style: outerStyle,
    ...restProps
}) => {
    const cellModel = useTableEntity((tableModel) =>
        tableModel
            .getBody()
            .getOrCreateRow({ props: { index: rowIndex } })
            .getOrCreateCell({ props: { index: colIndex } })
    );
    const style = useTableCellStyle({ outerStyle, colIndex });

    return (
        <div
            ref={cellModel.getRef()}
            style={style}
            data-component={'cell'}
            {...restProps}
        >
            {children}
        </div>
    );
};
