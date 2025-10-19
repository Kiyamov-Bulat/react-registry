import { FC } from 'react';
import { DATA } from './data';
import { Registry, SortDirection, Table } from '../components';
import s from './styles.module.scss';

const getSortSymbol = (sortDir: SortDirection) => {
    switch (sortDir) {
        case 'asc':
            return '↓';
        case 'desc':
            return '↑';
    }

    return '';
};

const HEADERS = [
    { key: 'fullName', width: 'calc(50% - 30px)', label: 'Full name' },
    {
        key: 'employeeNumber',
        width: 'calc(50% - 30px)',
        label: 'Employee number',
    },
    { key: 'age', width: '50px', label: 'Age' },
] as const;

export const CustomRegistry: FC = () => {
    return (
        <Registry
            data={DATA}
            headers={HEADERS as any}
            variant={'bordered'}
            sortable={true}
            filterable={false}
            className={s.customRegistry}
            renderHeaderCell={(props) => {
                return (
                    <Table.HeaderCell
                        index={props.index}
                        width={props.header.width}
                        onClick={() => props.setSort(props.header.key)}
                    >
                        {props.header.label}
                        {getSortSymbol(props.sortDirection)}
                    </Table.HeaderCell>
                );
            }}
        />
    );
};
