import { FC } from 'react';
import { useTableEntity, useTableHeaderStyle } from '../../lib';
import { HeaderProps } from '../../types';

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
