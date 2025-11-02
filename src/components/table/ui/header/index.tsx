import { FC } from 'react';
import { useTableEntity } from '../../lib';
import { HeaderProps } from '../../types';
import { useTableHeaderStyle } from '../../lib/header';

export const Header: FC<HeaderProps> = ({ style: outerStyle, ...restProps }) => {
    const headerModel = useTableEntity((tableModel) => tableModel.getHeader());
    const style = useTableHeaderStyle({ outerStyle });

    return (
        <div
            data-component={'header'}
            ref={headerModel.getRef()}
            {...restProps}
            style={style}
        />
    );
};
