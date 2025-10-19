import { FC, useState } from 'react';
import s from './styles.module.scss';
import { TableCompoundComponentRegistry } from './table-compound-component-registry';
import { RegistryVariant, VariantSwitcher } from './variant-switcher';
import { Registry } from '../components';
import { DATA, HEADERS } from './data';
import { CustomRegistry } from './custom-registry';

export const DemoApp: FC = () => {
    const [registryVariant, setRegistryVariant] = useState<RegistryVariant>(
        'table-compound-component'
    );

    const getRegistry = () => {
        switch (registryVariant) {
            case 'table-compound-component':
                return <TableCompoundComponentRegistry />;
            case 'custom':
                return <CustomRegistry />;
            default:
                return (
                    <Registry
                        data={DATA}
                        headers={HEADERS as any}
                        variant={registryVariant}
                        sortable={true}
                        filterable={true}
                    />
                );
        }
    };

    return (
        <div className={s.appContainer}>
            <div className={s.appHeader}>
                <h1 className={s.title}>REACT-REGISTRY</h1>
                <VariantSwitcher
                    setVariant={setRegistryVariant}
                    variant={registryVariant}
                />
            </div>
            <div className={s.tableWrapper}>{getRegistry()}</div>
        </div>
    );
};
