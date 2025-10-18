import { FC, useCallback, useMemo, useRef } from 'react';
import { PopupProps } from '../../types';
import { useDropdownContext } from '../../lib';
import { usePopupPosition } from '../../lib/popup-position';
import s from './styles.module.scss';
import cx from 'classnames';
import { useOutsideClick } from '../../../../lib';

export const Popup: FC<PopupProps> = ({
    children,
    style,
    usePortal,
    className,
    variant = 'primary',
    ...props
}) => {
    const { anchorRef, opened, setOpened } = useDropdownContext();
    const position = usePopupPosition({ anchorRef, local: !usePortal });
    const ref = useRef<HTMLDivElement>(null);

    useOutsideClick(
        useMemo(() => [ref, anchorRef], []),
        useCallback(() => setOpened(false), []),
        { enabled: opened }
    );

    if (!opened) return null;

    return (
        <div
            style={{ ...position, ...style }}
            className={cx(s.popup, s[variant], className)}
            data-component={'popup'}
            ref={ref}
            {...props}
        >
            {children}
        </div>
    );
};
