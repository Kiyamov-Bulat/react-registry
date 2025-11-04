import { FC, useCallback, useMemo, useRef } from 'react';
import { PopupProps } from '../../types';
import { useDropdownContext } from '../../lib';
import { usePopupPosition } from '../../lib/popup-position';
import s from './styles.module.scss';
import cx from 'classnames';
import { useHotkey, useOutsideClick } from '../../../../lib';
import { createPortal } from 'react-dom';

export const Popup: FC<PopupProps> = ({
    children,
    style,
    usePortal,
    className,
    align = 'center',
    variant = 'primary',
    anchorRef: outerAnchorRef,
    opened: outerOpened,
    onClose,
    ...props
}) => {
    const {
        anchorRef: innerAnchorRef,
        opened: innerOpened,
        setOpened,
    } = useDropdownContext();
    const anchorRef = outerAnchorRef ?? innerAnchorRef;
    const opened = outerOpened ?? innerOpened;
    const ref = useRef<HTMLDivElement>(null);
    const position = usePopupPosition({
        enabled: opened,
        popupRef: ref,
        anchorRef,
        align,
        local: !usePortal,
    });
    const close = useCallback(() => {
        setOpened(false);
        onClose?.();
    }, [onClose]);
    const closeHookOptions = { enabled: opened };
    const refList = useMemo(() => [ref, anchorRef], []);

    useOutsideClick(refList, close, closeHookOptions);
    useHotkey('Escape', close, closeHookOptions);

    if (!opened) return null;

    const component = (
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

    if (usePortal) return createPortal(component, document.body);

    return component;
};
