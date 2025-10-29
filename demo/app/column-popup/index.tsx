import React, { FC } from 'react';
import { FilterInput } from '../../../components/registry/ui/filter/filter-input';
import { Dropdown } from '../../../components/dropdown';
import { ColumnPopupProps } from '../../../components/registry/types';
import { SortDropdownItem } from './sort-dropdown-item';

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
