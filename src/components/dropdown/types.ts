import { BaseProps } from '../types';

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
}

export interface ToggleProps extends BaseProps {}
