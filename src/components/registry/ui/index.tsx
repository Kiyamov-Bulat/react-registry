import React from 'react';
import {
    RegistryProps,
    RenderCellProps,
    RenderHeaderCellInfo,
    WithId,
} from '../types';
import { useTableFilter, useTableSort } from '../lib';
import { Table } from '../../table';
import cx from 'classnames';
import s from './styles.module.scss';
import { getRegistryHeaderCellComponents } from '../lib/get-registry-header-cell-components';
import { getRegistryCellComponents } from '../lib/get-registry-cell-components';

export const Registry = <T extends WithId = WithId>({
    data,
    headers,
    sortable = false,
    filterable = false,
    className,
    variant,
    layoutMode,
    renderCell,
    renderHeaderCell,
}: RegistryProps<T>) => {
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
            layoutMode={layoutMode}
        >
            <Table.Header>
                {headers.map((header, index) => {
                    const isSortable = sortable && (header.sortable ?? true);
                    const isFilterable = filterable && (header.filterable ?? true);
                    const filterValue = String(filterValues[header.key] ?? '');
                    const sortDir =
                        sort.field === header.key ? sort.direction : null;

                    const { Wrapper, Content, Component } =
                        getRegistryHeaderCellComponents(renderHeaderCell);

                    const props: RenderHeaderCellInfo<T> = {
                        index: index,
                        header: header,
                        isSortable: isSortable,
                        isFilterable: isFilterable,
                        filterValue: filterValue,
                        sortDirection: sortDir,
                    };

                    const element = (
                        <Component
                            {...props}
                            setSort={setSort}
                            setFilter={setFilter}
                            key={String(header.key)}
                        >
                            {Content ? <Content {...props} /> : header.label}
                        </Component>
                    );

                    if (Wrapper)
                        return (
                            <Wrapper {...props} key={String(header.key)}>
                                {element}
                            </Wrapper>
                        );

                    return element;
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
                            const { Wrapper, Component, Content } =
                                getRegistryCellComponents<T>(renderCell);
                            const props: RenderCellProps<T> = {
                                value,
                                row,
                                columnKey: header.key,
                                rowIndex,
                                colIndex,
                            };

                            const element = (
                                <Component {...props} key={String(header.key)}>
                                    {Content ? (
                                        <Content {...props} />
                                    ) : (
                                        String(value)
                                    )}
                                </Component>
                            );
                            if (Wrapper)
                                return (
                                    <Wrapper {...props} key={String(header.key)}>
                                        {element}
                                    </Wrapper>
                                );
                            return element;
                        })}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};
