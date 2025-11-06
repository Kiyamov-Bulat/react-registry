import { FC } from 'react';
import { ItemProps } from '../../types';
import s from './styles.module.scss';
import cx from '@/lib/classnames';

export const Item: FC<ItemProps> = ({
    children,
    className,
    variant = 'primary',
    ...props
}) => {
    return (
        <div
            data-component={'item'}
            className={cx(s.item, s[variant], className)}
            {...props}
        >
            {children}
        </div>
    );
};
