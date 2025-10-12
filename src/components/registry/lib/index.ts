// components/Registry/utils.ts
export const getDefaultComparator = <T>(a: T, b: T, field: keyof T): number => {
    const aVal = a[field];
    const bVal = b[field];

    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return 1;
    if (bVal == null) return -1;

    if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal, undefined, { numeric: true });
    }

    if (aVal < bVal) return -1;
    if (aVal > bVal) return 1;
    return 0;
};
