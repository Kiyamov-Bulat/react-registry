import { FC, useCallback, useMemo, useRef } from 'react';
import { PopupProps } from '../../types';
import { useDropdownContext } from '../../lib';
import { usePopupPosition } from '../../lib/popup-position';
import s from './styles.module.scss';
import cx from 'classnames';
import { useHotkey, useOutsideClick } from '../../../../lib';

export const Popup: FC<PopupProps> = ({
    children,
    style,
    usePortal,
    className,
    align = 'center',
    variant = 'primary',
    ...props
}) => {
    const { anchorRef, opened, setOpened } = useDropdownContext();
    const ref = useRef<HTMLDivElement>(null);
    const position = usePopupPosition({
        enabled: opened,
        popupRef: ref,
        anchorRef,
        align,
        local: !usePortal,
    });
    const close = useCallback(() => setOpened(false), []);
    const closeHookOptions = { enabled: opened };
    const refList = useMemo(() => [ref, anchorRef], []);

    useOutsideClick(refList, close, closeHookOptions);
    useHotkey('Escape', close, closeHookOptions);

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
