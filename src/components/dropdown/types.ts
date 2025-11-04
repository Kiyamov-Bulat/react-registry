import { BaseProps } from '../types';
import { RefObject } from 'react';

export interface DropdownProps extends BaseProps {}

export type DropdownItemVariant = 'unstyled' | 'primary';

export interface ItemProps extends BaseProps {
    variant?: DropdownItemVariant;
}

export type PopupVariant = 'unstyled' | 'primary';

export type PopupAlign = 'start' | 'center' | 'end';

export interface PopupProps extends BaseProps {
    usePortal?: boolean;
    variant?: PopupVariant;
    align?: PopupAlign;
    anchorRef?: RefObject<HTMLElement | null>;
    opened?: boolean;
    onClose?: () => void;
}

export interface ToggleProps extends BaseProps {}
