import { FC, useState } from 'react';
import s from './styles.module.scss';
import { CustomRegistry } from './custom-registry';
import { RegistryVariant, VariantSwitcher } from './variant-switcher';
import { Registry } from '../components';
import { DATA, HEADERS } from './data';

export const DemoApp: FC = () => {
    const [registryVariant, setRegistryVariant] =
        useState<RegistryVariant>('custom');

    return (
        <div className={s.appContainer}>
            <div className={s.appHeader}>
                <h1 className={s.title}>REACT-REGISTRY</h1>
                <VariantSwitcher
                    setVariant={setRegistryVariant}
                    variant={registryVariant}
                />
            </div>
            <div className={s.tableWrapper}>
                {registryVariant === 'custom' ? (
                    <CustomRegistry />
                ) : (
                    <Registry
                        data={DATA}
                        headers={HEADERS as any}
                        variant={registryVariant}
                        sortable={true}
                        filterable={true}
                    />
                )}
            </div>
        </div>
    );
};
