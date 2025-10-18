import { FC } from 'react';
import { DATA, HEADERS } from './data';
import { Registry } from '../components';
import s from './styles.module.scss';

export const CustomRegistry: FC = () => {
    return (
        <Registry
            data={DATA}
            headers={HEADERS as any}
            variant={'bordered'}
            sortable={true}
            filterable={true}
            className={s.customRegistry}
        />
    );
};
