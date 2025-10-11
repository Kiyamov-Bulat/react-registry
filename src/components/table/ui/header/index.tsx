import { FC, useRef } from 'react';
import { useTableEntity } from '../../lib';
import { HeaderProps } from '../../types';

export const Header: FC<HeaderProps> = ({ ...restProps }) => {
    const ref = useRef<HTMLDivElement>(null);
    const headerModel = useTableEntity((tableModel) =>
        tableModel.getOrCreateHeader(ref)
    );

    return <div data-component={'header'} {...restProps} />;
};
