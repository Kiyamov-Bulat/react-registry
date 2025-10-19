import React from 'react';
import { Dropdown } from '../../dropdown';
import s from './styles.module.scss';
import { Table } from '../../table';
import cx from 'classnames';
import { Indicators } from './indicators';
import { ColumnPopup } from './column-popup';
import { RenderHeaderCellProps } from '../types';

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
        <Dropdown key={String(header.key)}>
            <Dropdown.Toggle className={s.headerToggle}>
                <Table.HeaderCell
                    className={cx(s.headerCell, {
                        [s.sortable]: isSortable,
                        [s.filterable]: isFilterable,
                    })}
                    data-column={String(header.key)}
                    data-sortable={isSortable || undefined}
                    data-sort-direction={sortDirection ?? undefined}
                    data-col-index={index}
                    index={index}
                    width={header.width}
                >
                    <div className={s.label}>{header.label}</div>
                    <Indicators hasFilter={!!filterValue} sort={sortDirection} />
                </Table.HeaderCell>
            </Dropdown.Toggle>
            <ColumnPopup
                filterValue={filterValue}
                isSortable={isSortable}
                isFilterable={isFilterable}
                onSort={(value) => setSort(header.key, value)}
                onFilter={(value) => setFilter(header.key, value)}
                sortDirection={sortDirection}
            />
        </Dropdown>
    );
};
