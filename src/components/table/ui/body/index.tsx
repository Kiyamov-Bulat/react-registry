import { FC, useRef } from 'react';
import { BodyProps } from '../../types';
import { useTableEntity } from '../../lib';

export const Body: FC<BodyProps> = ({ children, ...restProps }) => {
    const ref = useRef<HTMLDivElement>(null);
    const bodyModel = useTableEntity((tableModel) =>
        tableModel.getOrCreateBody({ ref })
    );

    return (
        <div ref={ref} data-component={'body'} {...restProps}>
            {children}
        </div>
    );
};
