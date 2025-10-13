import { HTMLProps, PropsWithoutRef, ReactNode } from 'react';

export interface BaseProps extends PropsWithoutRef<HTMLProps<HTMLElement>> {
    className?: string;
    children?: ReactNode;
}
