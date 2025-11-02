import React, { FC } from 'react';
import { SortDropdownItem } from './sort-dropdown-item';
import { ColumnPopupProps, Dropdown } from '../../../src';
import { FilterInput } from '../../../src/components/registry/ui/filter/filter-input';

export const ColumnPopup: FC<ColumnPopupProps> = ({
    isFilterable,
    isSortable,
    onFilter,
    onSort,
    filterValue,
    sortDirection,
}) => {
    return (
        <Dropdown.Popup>
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
