import { FC, useCallback, useRef, useState } from 'react';
import { DATA } from '../../data';
import s from './styles.module.scss';
import { Registry, RegistryHeader, SortDirection, Table } from '../../../../src';
import { ColumnPopup } from './column-popup';

const getSortSymbol = (sortDir: SortDirection) => {
    switch (sortDir) {
        case 'asc':
            return '↓';
        case 'desc':
            return '↑';
    }

    return '';
};

const getStatusSymbol = (status: string) => (status === 'active' ? '✅' : '❌');

const HEADERS: RegistryHeader<(typeof DATA)[number]>[] = [
    { key: 'fullName', width: 'minmax(150px, 1fr)', label: 'Full name' },
    {
        key: 'employeeNumber',
        width: 'minmax(100px, 1fr)',
        label: 'Employee number',
    },
    { key: 'age', width: '50px', label: 'Age' },
    { key: 'status', width: '150px', label: 'Status' },
];

export const RegistryWithPopup: FC = () => {
    return (
        <Registry
            data={DATA}
            headers={HEADERS}
            variant={'bordered'}
            layoutMode={'grid'}
            sortable={true}
            filterable={true}
            className={s.customRegistry}
            renderHeaderCell={{
                Component: ({ header, ...props }) => {
                    const ref = useRef<HTMLDivElement>(null);
                    const [opened, setOpened] = useState(false);
                    const toggle = useCallback(() => setOpened((prev) => !prev), []);
                    const filter = (value: string) =>
                        props.setFilter(header.key, value);

                    const sort = (sortDirection: SortDirection) =>
                        props.setSort(header.key, sortDirection);

                    return (
                        <Table.HeaderCell
                            index={props.index}
                            width={header.width}
                            onClick={toggle}
                        >
                            <div ref={ref}>
                                {props.children}
                                {getSortSymbol(props.sortDirection)}
                            </div>
                            <ColumnPopup
                                {...props}
                                onFilter={filter}
                                onSort={sort}
                                onClose={toggle}
                                anchorRef={ref}
                                opened={opened}
                            />
                        </Table.HeaderCell>
                    );
                },
            }}
            renderCell={{
                Content: (props) => {
                    if (props.columnKey === 'status')
                        return (
                            <div className={s.status}>
                                <div>{props.value}</div>
                                {getStatusSymbol(props.value)}
                            </div>
                        );

                    return props.value;
                },
            }}
        />
    );
};
