import { FC } from 'react';
import s from './styles.module.scss';
import { TableVariant } from '../../src';

export type RegistryVariant = TableVariant | 'table-compound-component' | 'custom';

export const REGISTRY_VARIANTS: RegistryVariant[] = [
    'simple',
    'striped',
    'bordered',
    'custom',
    'table-compound-component',
];

type VariantSwitcherProps = {
    variant: RegistryVariant;
    setVariant: (variant: RegistryVariant) => void;
};

export const VariantSwitcher: FC<VariantSwitcherProps> = ({
    variant: currentVariant,
    setVariant,
}) => {
    return (
        <div className={s.registryVariants}>
            {REGISTRY_VARIANTS.map((variant) => (
                <div key={variant} className={s.variant}>
                    <label>{variant}</label>
                    <input
                        type={'radio'}
                        value={variant}
                        checked={variant === currentVariant}
                        onChange={(e) =>
                            setVariant(e.target.value as RegistryVariant)
                        }
                    />
                </div>
            ))}
        </div>
    );
};
