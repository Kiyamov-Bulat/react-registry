import React, { ReactNode } from 'react';
import { RegistryProps, WithId } from '../types';
import { useTableSort } from '../lib/table-sort';
import { Table } from '../../table';

export const Registry = <T extends WithId = WithId>({
    data,
    headers,
    sortable = false,
    filterable = false,
    className,
    variant,
    renderCell: RenderCell,
}: RegistryProps<T>) => {
    const { sort, sortedData, onSort } = useTableSort(data);

    // ===== ФИЛЬТРАЦИЯ (заглушка) =====
    const processedData = sortedData;

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
                    const ariaSort = sortDir
                        ? (`${sortDir}ending` as const)
                        : undefined;

                    return (
                        <Table.HeaderCell
                            key={String(header.key)}
                            onClick={
                                isSortable
                                    ? () => onSort(header.key)
                                    : undefined
                            }
                            data-column={String(header.key)}
                            data-sortable={isSortable || undefined}
                            data-sort-direction={sortDir ?? undefined}
                            style={
                                isSortable ? { cursor: 'pointer' } : undefined
                            }
                            aria-sort={ariaSort}
                            index={index}
                            width={header.width ?? '150px'}
                        >
                            {header.label}
                            {isSortable && sortDir && (
                                <span
                                    aria-hidden="true"
                                    data-component={'sort-icon'}
                                >
                                    {sortDir === 'asc' ? ' ↑' : ' ↓'}
                                </span>
                            )}
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
