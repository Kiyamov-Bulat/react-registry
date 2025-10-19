import React, { ReactNode } from 'react';
import { RegistryProps, WithId } from '../types';
import { useTableSort } from '../lib/table-sort';
import { Table } from '../../table';
import { useTableFilter } from '../lib/table-filter';
import cx from 'classnames';
import s from './styles.module.scss';
import { RegistryHeaderCell } from './registry-header-cell';

export const Registry = <T extends WithId = WithId>({
    data,
    headers,
    sortable = false,
    filterable = false,
    className,
    variant,
    renderCell: RenderCell,
    renderHeaderCell: RenderHeaderCell = RegistryHeaderCell,
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
                        <RenderHeaderCell
                            key={String(header.key)}
                            index={index}
                            header={header}
                            isSortable={isSortable}
                            isFilterable={isFilterable}
                            filterValue={filterValue}
                            sortDirection={sortDir}
                            setSort={setSort}
                            setFilter={setFilter}
                        />
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
