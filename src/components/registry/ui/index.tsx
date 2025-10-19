import React, { ReactNode } from 'react';
import { RegistryProps, WithId } from '../types';
import { useTableSort } from '../lib/table-sort';
import { Table } from '../../table';
import { useTableFilter } from '../lib/table-filter';
import cx from 'classnames';
import s from './styles.module.scss';
import { Dropdown } from '../../dropdown';
import { ColumnPopup } from './column-popup';
import { Indicators } from './indicators';

export const Registry = <T extends WithId = WithId>({
    data,
    headers,
    sortable = false,
    filterable = false,
    className,
    variant,
    renderCell: RenderCell,
}: RegistryProps<T>) => {
    // ===== ФИЛЬТРАЦИЯ =====
    const {
        filteredData: preSortedData,
        filterValues,
        setFilter,
    } = useTableFilter(data, {});
    const { sort, sortedData: processedData, setSort } = useTableSort(preSortedData);

    return (
        <Table
            className={cx(s.registry, className)}
            variant={variant}
            data-sortable={sortable || undefined}
            data-filterable={filterable || undefined}
        >
            <Table.Header>
                {headers.map((header, index) => {
                    const isSortable = sortable && (header.sortable ?? true);
                    const isFilterable = filterable && (header.filterable ?? true);
                    const filterValue = String(filterValues[header.key] ?? '');
                    const sortDir =
                        sort.field === header.key ? sort.direction : null;

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
                                    data-sort-direction={sortDir ?? undefined}
                                    data-col-index={index}
                                    index={index}
                                    width={header.width}
                                >
                                    <div className={s.label}>{header.label}</div>
                                    <Indicators
                                        hasFilter={!!filterValue}
                                        sort={sortDir}
                                    />
                                </Table.HeaderCell>
                            </Dropdown.Toggle>
                            <ColumnPopup
                                filterValue={filterValue}
                                isSortable={isSortable}
                                isFilterable={isFilterable}
                                onSort={(value) => setSort(header.key, value)}
                                onFilter={(value) => setFilter(header.key, value)}
                                sortDirection={sortDir}
                            />
                        </Dropdown>
                    );
                })}
            </Table.Header>

            <Table.Body>
                {processedData.map((row, rowIndex) => (
                    <Table.Row
                        key={row.id ?? rowIndex}
                        data-row-index={rowIndex}
                        data-row-id={row.id}
                        index={rowIndex}
                    >
                        {headers.map((header, colIndex) => {
                            const value = row[header.key];
                            const cellContent = RenderCell ? (
                                <RenderCell
                                    value={value}
                                    row={row}
                                    columnKey={header.key as never} // @TODO
                                />
                            ) : (
                                (value as ReactNode) // @TODO
                            );

                            return (
                                <Table.Cell
                                    key={String(header.key)}
                                    data-cell={String(header.key)}
                                    data-row-index={rowIndex}
                                    data-col-index={colIndex}
                                    colIndex={colIndex}
                                    rowIndex={rowIndex}
                                >
                                    {cellContent}
                                </Table.Cell>
                            );
                        })}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};
