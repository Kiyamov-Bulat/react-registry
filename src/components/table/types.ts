import { HTMLProps, PropsWithoutRef, ReactNode } from 'react';

export interface BaseProps extends PropsWithoutRef<HTMLProps<HTMLElement>> {
    className?: string;
    children?: ReactNode;
}

export interface BodyProps extends BaseProps {}

export interface CellProps extends BaseProps {
    colIndex: number;
    rowIndex: number;
}

export type TableVariant = 'unstyled' | 'simple' | 'striped' | 'bordered';

export interface ContainerProps extends BaseProps {
    variant?: TableVariant;
}

export interface HeaderProps extends BaseProps {}

export interface HeaderCellProps extends BaseProps {
    index: number;
    width?: string;
}

export interface RowProps extends BaseProps {
    index: number;
}
