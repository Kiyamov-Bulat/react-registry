import { FC, useRef } from 'react';
import { useTableEntity } from '../../lib';
import { RowProps } from '../../types';

export const Row: FC<RowProps> = ({ index, children, ...restProps }) => {
    const ref = useRef<HTMLDivElement>(null);
    const rowModel = useTableEntity((tableModel) => {
        return tableModel.getOrCreateBody().createRow(index, ref);
    });

    return (
        <div ref={ref} data-component={'row'} {...restProps}>
            {children}
        </div>
    );
};
