import { FC } from 'react';
import { TableContext, tableContext } from '../../lib';
import { TableModel } from '../../../../models';
import cx from 'classnames';
import s from './styles.module.scss';
import { ContainerProps } from '../../types';
import { useLazyRef } from '../../../../lib';

export const Container: FC<ContainerProps> = ({
    variant,
    className,
    children,
    layoutMode = 'fixed',
    ...restProps
}) => {
    const context = useLazyRef<TableContext>(() => {
        return { tableModel: TableModel.empty(), layoutMode };
    });

    return (
        <tableContext.Provider value={context.current}>
            <div
                className={cx(s.root, className, variant && s[variant])}
                data-component={'table'}
                ref={context.current.tableModel.getRef()}
                {...restProps}
            >
                {children}
            </div>
        </tableContext.Provider>
    );
};
