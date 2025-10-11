import { FC } from 'react';
import s from './styles.module.scss';
import { TableVariant } from '../components';

export type RegistryVariant = TableVariant | 'custom';

const VARIANTS: RegistryVariant[] = ['custom', 'simple', 'striped', 'bordered'];

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
            {VARIANTS.map((variant) => (
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
