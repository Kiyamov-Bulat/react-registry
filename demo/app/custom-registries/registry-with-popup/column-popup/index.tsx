import React, { FC, ReactNode, RefObject } from 'react';
import { SortDropdownItem } from './sort-dropdown-item';
import { Dropdown, SortDirection } from '../../../../../src';
import { FilterInput } from '../../../../../src/components/registry/ui/filter/filter-input';

export type ColumnPopupProps = {
    children?: ReactNode;
    isFilterable?: boolean;
    isSortable?: boolean;
    onFilter?: (value: string) => void;
    onSort?: (dir: SortDirection) => void;
    filterValue?: string;
    sortDirection?: SortDirection;
    onClose: () => void;
    anchorRef: RefObject<HTMLElement | null>;
    opened: boolean;
};

export const ColumnPopup: FC<ColumnPopupProps> = ({
    isFilterable,
    isSortable,
    onFilter,
    onSort,
    filterValue,
    sortDirection,
    onClose,
    anchorRef,
    opened,
}) => {
    return (
        <Dropdown.Popup
            opened={opened}
            anchorRef={anchorRef}
            onClose={onClose}
            usePortal={true}
            align={'start'}
        >
            {isFilterable && (
                <FilterInput
                    value={filterValue || ''}
                    onChange={(value) => onFilter?.(value)}
                    placeholder={'Enter the value'}
                />
            )}
            {isSortable && (
                <>
                    <SortDropdownItem
                        direction={'asc'}
                        onSort={onSort}
                        activeDirection={sortDirection}
                    />
                    <SortDropdownItem
                        direction={'desc'}
                        onSort={onSort}
                        activeDirection={sortDirection}
                    />
                </>
            )}
        </Dropdown.Popup>
    );
};
