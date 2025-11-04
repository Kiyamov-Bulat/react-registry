import { BaseProps } from '../types';
import { RefObject } from 'react';

/** Props for the root Dropdown component (container). */
export interface DropdownProps extends BaseProps {}

/** Visual styling variants for individual dropdown items. */
export type DropdownItemVariant = 'unstyled' | 'primary';

/** Props for a single dropdown menu item. */
export interface ItemProps extends BaseProps {
    /**
     * Visual style of the item.
     * @default 'primary'
     */
    variant?: DropdownItemVariant;
}

/** Visual styling variants for the dropdown popup. */
export type PopupVariant = 'unstyled' | 'primary';

/** Alignment of the popup relative to the toggle/anchorRef. */
export type PopupAlign = 'start' | 'center' | 'end';

/** Props for the dropdown popup. */
export interface PopupProps extends BaseProps {
    /**
     * Whether to render the popup inside a React Portal (e.g., to avoid clipping).
     */
    usePortal?: boolean;
    /**
     * Visual style of the popup.
     * @default 'primary'
     */
    variant?: PopupVariant;
    /**
     * Horizontal alignment relative to the anchor element.
     * @default 'center'
     */
    align?: PopupAlign;
    /**
     * Reference to the anchor (toggle) element for positioning.
     * Not required if Dropdown.Toggle is used.
     * */
    anchorRef?: RefObject<HTMLElement | null>;
    /**
     * Controls whether the popup is visible.
     * Not required if Dropdown.Toggle is used.
     * */
    opened?: boolean;
    /** Callback fired when the popup should close (e.g., on outside click or Escape). */
    onClose?: () => void;
}

/** Props for the dropdown toggle element (e.g., a button that opens the menu). */
export interface ToggleProps extends BaseProps {}
