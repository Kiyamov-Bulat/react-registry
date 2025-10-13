import { BaseProps } from '../types';

export interface DropdownProps extends BaseProps {}

export interface ItemProps extends BaseProps {
    variant?: 'unstyled' | 'primary';
}

export interface PopupProps extends BaseProps {
    usePortal?: boolean;
    variant?: 'unstyled' | 'primary';
}

export interface ToggleProps extends BaseProps {}
