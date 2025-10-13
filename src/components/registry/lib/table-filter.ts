import { useCallback, useMemo, useState } from 'react';
import { FilterValue, FilterValueDict, UseTableFilterOptions } from '../types';

const defaultPredicate = (item: any, filters: Record<string, FilterValue>) => {
    return Object.entries(filters).every(([key, value]) => {
        if (value == null || value === '') return true;

        const itemValue = item[key];

        if (itemValue == null) return false;

        // Поддержка строк (регистронезависимо)
        if (typeof itemValue === 'string' && typeof value === 'string') {
            return itemValue.toLowerCase().includes(value.toLowerCase());
        }

        // Точное совпадение для чисел/булевых
        return itemValue === value;
    });
};

export const useTableFilter = <T extends Record<string, any>>(
    data: T[],
    options: UseTableFilterOptions<T> = {}
) => {
    const {
        initialFilterValues = {} as FilterValueDict<T>,
        customFilterPredicate = defaultPredicate,
    } = options;
    const [filterValues, setFilterValues] = useState(initialFilterValues);

    const filteredData = useMemo(() => {
        if (Object.keys(filterValues).length === 0) return data;

        return data.filter((item) => customFilterPredicate(item, filterValues));
    }, [data, filterValues, customFilterPredicate]);

    const setFilter = useCallback((columnKey: keyof T, value: FilterValue) => {
        setFilterValues((prev) => ({
            ...prev,
            [columnKey]: value,
        }));
    }, []);

    const clearFilters = useCallback(() => {
        setFilterValues({} as FilterValueDict<T>);
    }, []);

    return {
        filteredData,
        filterValues,
        setFilter,
        clearFilters,
    };
};
