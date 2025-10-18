// hooks/useTableSort.ts
import { useState, useMemo, useCallback } from 'react';
import { SortDirection, SortState, UseTableSortOptions } from '../types';

const defaultComparator = <T extends object>(a: T, b: T, field: keyof T): number => {
    const aVal = a[field];
    const bVal = b[field];

    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return 1;
    if (bVal == null) return -1;

    if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal, undefined, { numeric: true });
    }

    // Числа и даты
    if (aVal < bVal) return -1;
    if (aVal > bVal) return 1;
    return 0;
};

export const useTableSort = <T extends object>(
    data: T[],
    options: UseTableSortOptions<T> = {}
) => {
    const {
        initialField,
        initialDirection = 'asc',
        customComparator = defaultComparator,
    } = options;

    const [sort, setSort] = useState<SortState<T>>({
        field: initialField ?? null,
        direction: initialField ? initialDirection : null,
    });

    const sortedData = useMemo(() => {
        if (!sort.field || !sort.direction) return data;

        const comparator = (a: T, b: T): number => {
            return customComparator(a, b, sort.field!);
        };

        return [...data].sort((a, b) => {
            const result = comparator(a, b);

            return sort.direction === 'asc' ? result : -result;
        });
    }, [data, sort, customComparator]);

    const onSort = useCallback((field: keyof T, direction?: SortDirection) => {
        setSort((prev) => {
            if (direction) {
                if (prev.field === field && prev.direction === direction) {
                    return { field: null, direction: null };
                } else {
                    return { field, direction };
                }
            }

            if (prev.field === field) {
                // Цикл: asc → desc → null
                switch (prev.direction) {
                    case 'asc':
                        return { field, direction: 'desc' };
                    case 'desc':
                        return { field: null, direction: null };
                }
            }
            return { field, direction: 'asc' };
        });
    }, []);

    return {
        sortedData,
        setSort: onSort,
        sort,
    };
};
