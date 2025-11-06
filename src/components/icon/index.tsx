import { FC, SVGProps } from 'react';
import cx from '@/lib/classnames';
import s from './styles.module.scss';

export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
}

export const Icon: FC<IconProps> = ({
    size = '24px',
    width,
    height,
    children,
    className,
    ...props
}) => {
    const w = width ?? size;
    const h = height ?? size;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            width={w}
            height={h}
            className={cx(s.icon, className)}
            {...props}
        >
            {children}
        </svg>
    );
};
