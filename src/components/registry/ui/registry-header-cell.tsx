import React from 'react';
import s from './styles.module.scss';
import { Table } from '../../table';
import cx from 'classnames';
import { RenderHeaderCellProps } from '../types';
import { Icon } from '../../icon';
import { Filter } from './filter/filter';

export const RegistryHeaderCell = <T extends object = object>({
    header,
    isFilterable,
    isSortable,
    sortDirection,
    setSort,
    setFilter,
    filterValue,
    index,
}: RenderHeaderCellProps<T>) => {
    return (
        <Table.HeaderCell
            className={cx(s.headerCell, {
                [s.sortable]: isSortable,
                [s.filterable]: isFilterable,
            })}
            data-column={String(header.key)}
            data-sortable={isSortable || undefined}
            data-filterable={isFilterable || undefined}
            data-sort-direction={sortDirection ?? undefined}
            data-col-index={index}
            index={index}
            width={header.width}
            onClick={isSortable ? () => setSort(header.key) : undefined}
            textEllipsis={false}
        >
            <div className={s.label}>{header.label}</div>
            <div className={s.indicators}>
                {sortDirection && (
                    <Icon
                        size={24}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={cx(s.sortIndicator, {
                            [s.desc]: sortDirection === 'desc',
                        })}
                    >
                        <path d="M12 8L12 16" />
                        <path d="M15 11L12.087 8.08704V8.08704C12.039 8.03897 11.961 8.03897 11.913 8.08704V8.08704L9 11" />
                    </Icon>
                )}
                {isFilterable && (
                    <Filter
                        value={filterValue}
                        onChange={(value) => setFilter(header.key, value)}
                    />
                )}
            </div>
        </Table.HeaderCell>
    );
};
