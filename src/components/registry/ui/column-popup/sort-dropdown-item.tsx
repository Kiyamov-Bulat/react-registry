import React, { FC } from 'react';
import { Dropdown } from '../../../dropdown';
import { SortDirection } from '../../types';
import s from './styles.module.scss';

type SortDropdownItemProps = {
    direction: NonNullable<SortDirection>;
    onSort?: (direction: NonNullable<SortDirection>) => void;
};

const ASC_ICON = (
    <svg
        fill="#000000"
        width="24px"
        height="24px"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M30,11.67H29L25.71.71s0,0-.05-.08a.61.61,0,0,0-.09-.18c0-.06-.08-.1-.12-.15L25.31.19a.69.69,0,0,0-.19-.1L25,0h-.58l-.08,0a.69.69,0,0,0-.19.1.69.69,0,0,0-.13.11l-.13.15a1,1,0,0,0-.09.18s0,.05-.05.08l-3.28,11h-1a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2h-.41l.9-3H26l.9,3H26.5a1,1,0,0,0,0,2H30a1,1,0,0,0,0-2Zm-5.91-5,.66-2.19.66,2.19Z" />
        <path d="M7.25,0a1,1,0,0,0-1,1V28.67l-3.56-3.4a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l5.25,5c0,.05.1.06.15.1a.86.86,0,0,0,.16.1.94.94,0,0,0,.76,0,1.51,1.51,0,0,0,.17-.1s.1-.06.14-.1l5.25-5a1,1,0,0,0,0-1.41,1,1,0,0,0-1.42,0l-3.56,3.4V1A1,1,0,0,0,7.25,0Z" />
        <path d="M30,28.33a1,1,0,0,0-1,1V30H21.75l9-10a1,1,0,0,0,.17-1.07,1,1,0,0,0-.91-.6H19.5a1,1,0,0,0-1,1V21a1,1,0,0,0,2,0v-.67h7.26l-9,10A1,1,0,0,0,19.5,32H30a1,1,0,0,0,1-1V29.33A1,1,0,0,0,30,28.33Z" />
    </svg>
);

const DESC_ICON = (
    <svg
        fill="#000000"
        width="24px"
        height="24px"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M30,29.88H29L25.71,18.93s0-.06-.05-.09a.76.76,0,0,0-.09-.18l-.12-.14-.14-.12-.19-.1-.08,0H25l-.2,0-.2,0h-.09l-.08,0-.19.1a.74.74,0,0,0-.13.12.64.64,0,0,0-.13.15.91.91,0,0,0-.09.17s0,.05-.05.09l-3.28,11h-1a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2h-.41l.9-3H26l.9,3H26.5a1,1,0,0,0,0,2H30a1,1,0,0,0,0-2Zm-5.91-5,.66-2.18.66,2.18Z" />
        <path d="M2.69,6.72,6.25,3.33V31a1,1,0,0,0,2,0V3.33l3.56,3.39A1,1,0,0,0,12.5,7a1,1,0,0,0,.73-.31,1,1,0,0,0,0-1.42L7.94.27A1.1,1.1,0,0,0,7.8.18a1.51,1.51,0,0,0-.17-.1,1,1,0,0,0-.76,0,.86.86,0,0,0-.16.1.75.75,0,0,0-.15.09l-5.25,5A1,1,0,1,0,2.69,6.72Z" />
        <path d="M30,10.12a1,1,0,0,0-1,1v.67H21.75l9-10A1,1,0,0,0,30.91.71,1,1,0,0,0,30,.12H19.5a1,1,0,0,0-1,1V2.79a1,1,0,0,0,2,0V2.12h7.26l-9,10a1,1,0,0,0-.17,1.07,1,1,0,0,0,.91.6H30a1,1,0,0,0,1-1V11.12A1,1,0,0,0,30,10.12Z" />
    </svg>
);

const ITEM_CONTENT = {
    asc: { value: 'Sort A-z', icon: ASC_ICON },
    desc: { value: 'Sort Z-a', icon: DESC_ICON },
} as const;

export const SortDropdownItem: FC<SortDropdownItemProps> = ({
    direction,
    onSort,
}) => {
    const { icon, value } = ITEM_CONTENT[direction];

    return (
        <Dropdown.Item
            onClick={() => onSort?.(direction)}
            className={s.sortDropdownItem}
        >
            <div>{icon}</div>
            <div>{value}</div>
        </Dropdown.Item>
    );
};
