import { FC, useLayoutEffect, useRef } from 'react';
import { useTableEntity } from '../../lib';
import { HeaderCellProps } from '../../types';

export const HeaderCell: FC<HeaderCellProps> = ({
    index,
    style,
    children,
    width = '100px',
    ...restProps
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const cellModel = useTableEntity((tableModel) =>
        tableModel.getOrCreateHeader().getOrCreateCell(index, ref)
    );

    useLayoutEffect(() => {
        cellModel.updateProps({ width, index });
    }, [width, index, cellModel]);

    return (
        <div
            ref={ref}
            style={{ width, ...style }}
            data-component={'header-cell'}
            {...restProps}
        >
            {children}
        </div>
    );
};
