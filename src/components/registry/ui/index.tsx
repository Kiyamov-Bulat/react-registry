import React, { ReactNode } from 'react';
import { RegistryProps, WithId } from '../types';
import { useTableSort } from '../lib/table-sort';
import { Table } from '../../table';
import { useTableFilter } from '../lib/table-filter';
import cx from 'classnames';
import s from './styles.module.scss';
import { Dropdown } from '../../dropdown';
import { ColumnPopup } from './column-popup';

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
        clearFilters,
    } = useTableFilter(data, {});
    const { sort, sortedData: processedData, onSort } = useTableSort(preSortedData);

    return (
        <Table
            className={className}
            variant={variant}
            data-sortable={sortable || undefined}
            data-filterable={filterable || undefined}
        >
            <Table.Header>
                {headers.map((header, index) => {
                    const isSortable = sortable && (header.sortable ?? true);
                    const sortDir =
                        sort.field === header.key ? sort.direction : null;
                    const isFilterable = filterable && (header.filterable ?? true);
                    const filterValue = String(filterValues[header.key] ?? '');

                    return (
                        <Table.HeaderCell
                            key={String(header.key)}
                            className={cx(s.header, { [s.sortable]: isSortable })}
                            data-column={String(header.key)}
                            data-sortable={isSortable || undefined}
                            data-sort-direction={sortDir ?? undefined}
                            index={index}
                            width={header.width}
                        >
                            <Dropdown>
                                <Dropdown.Toggle>{header.label}</Dropdown.Toggle>
                                <ColumnPopup
                                    filterValue={filterValue}
                                    isSortable={isSortable}
                                    isFilterable={isFilterable}
                                    onSort={(value) => onSort(header.key, value)}
                                    onFilter={(value) =>
                                        setFilter(header.key, value)
                                    }
                                />
                            </Dropdown>
                        </Table.HeaderCell>
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
