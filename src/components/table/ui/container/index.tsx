import { FC, useMemo, useRef } from 'react';
import { TableContext, tableContext } from '../../lib';
import { TableModel } from '../../../../models';
import cx from 'classnames';
import s from './styles.module.scss';
import { ContainerProps } from '../../types';

export const Container: FC<ContainerProps> = ({
    variant,
    className,
    children,
    ...restProps
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const context = useMemo<TableContext>(() => {
        return { tableModel: TableModel.fromRef(ref) };
    }, []);

    return (
        <tableContext.Provider value={context}>
            <div
                className={cx(s.root, className, variant && s[variant])}
                data-component={'table'}
                {...restProps}
            >
                {children}
            </div>
        </tableContext.Provider>
    );
};
