import { FC } from 'react';
import { Registry, RegistryHeader, SortDirection } from '../../components';
import { DATA } from './data';
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

const HEADERS: RegistryHeader<(typeof DATA)[number]>[] = [
    { key: 'fullName', width: 'calc(50% - 30px)', label: 'Full name' },
    {
        key: 'employeeNumber',
        width: 'calc(50% - 30px)',
        label: 'Employee number',
    },
    { key: 'age', width: '50px', label: 'Age' },
];

export const CustomRegistry: FC = () => {
    return (
        <Registry
            data={DATA}
            headers={HEADERS}
            variant={'bordered'}
            sortable={true}
            filterable={false}
            className={s.customRegistry}
        />
    );
};
