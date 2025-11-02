import { BaseProps } from '../types';

export interface BodyProps extends BaseProps {}

export interface CellProps extends BaseProps {
    colIndex: number;
    rowIndex: number;
}

export type TableVariant = 'unstyled' | 'simple' | 'striped' | 'bordered';
export type TableLayout = 'fixed' | 'grid';

export interface ContainerProps extends BaseProps {
    variant?: TableVariant;
    layoutMode?: TableLayout;
}

export interface HeaderProps extends BaseProps {}

export interface HeaderCellProps extends BaseProps {
    index: number;
    width?: string;
    textEllipsis?: boolean;
}

export interface RowProps extends BaseProps {
    index: number;
}
