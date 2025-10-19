import { FC, ReactNode } from 'react';
import { TableVariant } from '../table';

/**** REGISTRY ****/

export type WithId = { id: number | string };

export interface RegistryHeader<T extends object = object> {
    key: keyof T;
    label: string;
    sortable?: boolean;
    filterable?: boolean;
    width?: string;
}

export interface RenderCellProps<T extends object = object> {
    value: any;
    row: T;
    columnKey: keyof T;
}

export type RenderHeaderCellProps<T extends object = object> = {
    header: RegistryHeader<T>;
    isSortable: boolean;
    isFilterable: boolean;
    sortDirection: SortDirection;
    index: number;
    filterValue: string;
    setFilter: (key: keyof T, value: string) => void;
    setSort: (key: keyof T, value: SortDirection) => void;
};

export interface RegistryProps<T extends WithId = WithId> {
    data: T[];
    headers: RegistryHeader<T>[];
    sortable?: boolean;
    filterable?: boolean;
    className?: string;
    variant?: TableVariant;
    renderCell?: FC<RenderCellProps>;
    renderHeaderCell?: FC<RenderHeaderCellProps>;
}

/**** SORT ****/

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState<T extends object> {
    field: keyof T | null;
    direction: SortDirection;
}

export type TableCellComparator<T extends object> = (
    a: T,
    b: T,
    field: keyof T
) => number;

export interface UseTableSortOptions<T extends object> {
    initialField?: keyof T;
    initialDirection?: Exclude<SortDirection, null>;
    customComparator?: TableCellComparator<T>;
}

/**** FILTER ****/

export type FilterValue = string | number | boolean | null | undefined;

export type FilterValueDict<T> = Record<keyof T, FilterValue>;

export type FilterPredicate<T> = (
    item: T,
    filterValues: FilterValueDict<T>
) => boolean;

export interface UseTableFilterOptions<T> {
    initialFilterValues?: FilterValueDict<T>;
    customFilterPredicate?: FilterPredicate<T>;
}

/**** CONTEXT-MENU ****/

export type ColumnPopupProps = {
    children?: ReactNode;
    isFilterable?: boolean;
    isSortable?: boolean;
    onFilter?: (value: string) => void;
    onSort?: (dir: SortDirection) => void;
    filterValue?: string;
    sortDirection?: SortDirection;
};
