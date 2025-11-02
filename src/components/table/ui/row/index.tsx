import { FC } from 'react';
import { useTableEntity, useTableRowStyle } from '../../lib';
import { RowProps } from '../../types';

export const Row: FC<RowProps> = ({
    index,
    children,
    style: outerStyle,
    ...restProps
}) => {
    const rowModel = useTableEntity((tableModel) => {
        return tableModel.getBody().getOrCreateRow({ props: { index } });
    });
    const style = useTableRowStyle({ outerStyle });

    return (
        <div
            ref={rowModel.getRef()}
            data-component={'row'}
            {...restProps}
            style={style}
        >
            {children}
        </div>
    );
};
