import { FC } from 'react';
import { TableVariant } from '../table';

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

export interface RegistryProps<T extends WithId = WithId> {
    data: T[];
    headers: RegistryHeader<T>[];
    sortable?: boolean;
    filterable?: boolean;
    className?: string;
    variant?: TableVariant;
    renderCell?: FC<RenderCellProps>;
}

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
