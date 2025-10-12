// Вспомогательные утилиты
import { SortDirection } from '../types';

export const getAriaSort = (
    dir: SortDirection
): 'ascending' | 'descending' | undefined => {
    if (dir === 'asc') return 'ascending';
    if (dir === 'desc') return 'descending';
    return undefined;
};

export const renderSortIcon = (dir: SortDirection) => {
    if (dir === 'asc') return ' ↑';
    if (dir === 'desc') return ' ↓';
    return ' ↕';
};
