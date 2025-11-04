import { FC, ReactNode } from 'react';
import { TableLayout, TableVariant } from '../table';

/**** REGISTRY ****/

/** Object that has a unique identifier. */
export type WithId = { id: number | string };

/**
 * Describes a single column in the registry table.
 */
export interface RegistryHeader<T extends object = object> {
    /** Key of the data field this column represents. */
    key: keyof T;
    /** Human-readable column label. */
    label: string;
    /** Whether the column supports sorting. */
    sortable?: boolean;
    /** Whether the column supports filtering. */
    filterable?: boolean;
    /** Optional CSS width for the column. */
    width?: string;
}

/**
 * Props passed to a custom cell renderer.
 */
export interface RenderCellProps<T extends object = object> {
    /** Value of the current cell. */
    value: any;
    /** Full data object for the current row. */
    row: T;
    /** Key of the current column. */
    columnKey: keyof T;
    /** Zero-based index of the current row. */
    rowIndex: number;
    /** Zero-based index of the current column. */
    colIndex: number;
    /** Optional children (e.g., default cell content). */
    children?: ReactNode;
}

/**
 * Information provided to a custom header cell renderer (Wrapper/Content) (read-only).
 */
export interface RenderHeaderCellInfo<T extends object = object> {
    /** Column configuration. */
    header: RegistryHeader<T>;
    /** Whether sorting is enabled for this column. */
    isSortable: boolean;
    /** Whether filtering is enabled for this column. */
    isFilterable: boolean;
    /** Current sort direction (`'asc'`, `'desc'`, or `null`). */
    sortDirection: SortDirection;
    /** Zero-based column index. */
    index: number;
    /** Current filter value for this column. */
    filterValue: string;
    /** Optional children (e.g., default header content). */
    children?: ReactNode;
}

/**
 * Full props for a custom header cell renderer (includes actions).
 */
export interface RenderHeaderCellProps<T extends object = object>
    extends RenderHeaderCellInfo<T> {
    /** Sets the filter value for a given column. */
    setFilter: (key: keyof T, value: string) => void;
    /** Sets or toggles the sort direction for a given column. */
    setSort: (key: keyof T, value?: SortDirection) => void;
}

/**
 * Configuration for customizing a table cell or header via composition.
 * - `Content`: replaces inner content only.
 * - `Wrapper`: wraps the default cell/header.
 * - `Component`: replaces the entire cell/header.
 */
type RenderComponent<TProps, TExtendedProps = TProps> = {
    Content?: FC<Omit<TProps, 'children'>>;
    Wrapper?: FC<TProps>;
    Component?: FC<TExtendedProps>;
};

/** Custom renderer configuration for a header cell. */
export type RenderHeaderCell<T extends object = object> = RenderComponent<
    RenderHeaderCellInfo<T>,
    RenderHeaderCellProps<T>
>;

/** Custom renderer configuration for a data cell. */
export type RenderCell<T extends object = object> = RenderComponent<
    RenderCellProps<T>
>;

/**
 * Main props for the Registry (sortable/filterable data table).
 */
export interface RegistryProps<T extends WithId = WithId> {
    /** Array of data items to display. */
    data: T[];
    /** Column definitions. */
    headers: RegistryHeader<T>[];
    /**
     * Enables sorting for all sortable columns.
     * @default true
     * */
    sortable?: boolean;
    /**
     * Enables filtering for all filterable columns.
     * @default true
     * */
    filterable?: boolean;
    /** Optional CSS class for the table container. */
    className?: string;
    /** Visual style variant of the table. */
    variant?: TableVariant;
    /** Table layout strategy (e.g., fixed or grid). */
    layoutMode?: TableLayout;
    /** Custom cell rendering configuration. */
    renderCell?: RenderCell<T>;
    /** Custom header cell rendering configuration. */
    renderHeaderCell?: RenderHeaderCell<T>;
}

/**** SORT ****/

/** Possible sort directions. */
export type SortDirection = 'asc' | 'desc' | null;

/** Current sorting state of the table. */
export interface SortState<T extends object> {
    /** Field currently being sorted (or `null` if none). */
    field: keyof T | null;
    /** Direction of the current sort. */
    direction: SortDirection;
}

/**
 * Custom comparator function for sorting table rows.
 * Should return a negative, zero, or positive number (like `Array.sort`).
 */
export type TableCellComparator<T extends object> = (
    a: T,
    b: T,
    field: keyof T
) => number;

/** Options for configuring table sorting behavior. */
export interface UseTableSortOptions<T extends object> {
    /** Initial field to sort by. */
    initialField?: keyof T;
    /** Initial sort direction. */
    initialDirection?: Exclude<SortDirection, null>;
    /** Custom comparison logic for sorting. */
    customComparator?: TableCellComparator<T>;
}

/**** FILTER ****/

/** Supported types for filter values. */
export type FilterValue = string | number | boolean | null | undefined;

/** Dictionary of current filter values, keyed by column. */
export type FilterValueDict<T> = Record<keyof T, FilterValue>;

/**
 * Custom predicate to determine if a row matches current filters.
 * Returns `true` if the item should be included.
 */
export type FilterPredicate<T> = (
    item: T,
    filterValues: FilterValueDict<T>
) => boolean;

/** Options for configuring table filtering behavior. */
export interface UseTableFilterOptions<T> {
    /** Initial filter values for each column. */
    initialFilterValues?: FilterValueDict<T>;
    /** Custom logic to evaluate row visibility. */
    customFilterPredicate?: FilterPredicate<T>;
}
