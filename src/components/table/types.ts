import { BaseProps } from '../types';

/** Props for the table body container. */
export interface BodyProps extends BaseProps {}

/** Props for an individual table cell. */
export interface CellProps extends BaseProps {
    /** Zero-based column index of the cell. */
    colIndex: number;
    /** Zero-based row index of the cell. */
    rowIndex: number;
    /**
     * Whether long text should be truncated with an ellipsis.
     * @default true
     */
    textEllipsis?: boolean;
}

/** Visual styling variants for the table. */
export type TableVariant = 'unstyled' | 'simple' | 'striped' | 'bordered';

/** Layout strategies for table column sizing. */
export type TableLayout = 'fixed' | 'grid';

/** Props for the root table container. */
export interface ContainerProps extends BaseProps {
    /** Visual style of the table. */
    variant?: TableVariant;
    /**
     * Column layout behavior.
     * @default 'fixed'
     */
    layoutMode?: TableLayout;
}

/** Props for the table header section. */
export interface HeaderProps extends BaseProps {}

/** Props for a header cell (column header). */
export interface HeaderCellProps extends BaseProps {
    /** Zero-based column index. */
    index: number;
    /**
     * Optional explicit column width (CSS value).
     * @default '100px'
     */
    width?: string;
    /**
     * Whether long text should be truncated with an ellipsis.
     * @default true
     */
    textEllipsis?: boolean;
}

/** Props for a table row. */
export interface RowProps extends BaseProps {
    /** Zero-based row index. */
    index: number;
}
