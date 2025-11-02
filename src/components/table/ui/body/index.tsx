import { FC } from 'react';
import { BodyProps } from '../../types';
import { useTableEntity } from '../../lib';

export const Body: FC<BodyProps> = ({ children, ...restProps }) => {
    const bodyModel = useTableEntity((tableModel) => tableModel.getBody());

    return (
        <div ref={bodyModel.getRef()} data-component={'body'} {...restProps}>
            {children}
        </div>
    );
};
