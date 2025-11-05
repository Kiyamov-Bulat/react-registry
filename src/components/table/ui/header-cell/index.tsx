import { FC, useLayoutEffect } from 'react';
import { useTableContext, useTableEntity } from '../../lib';
import { HeaderCellProps } from '../../types';
import s from './styles.module.scss';
import cx from 'classnames';

export const HeaderCell: FC<HeaderCellProps> = ({
    index,
    style,
    children,
    width = '100px',
    className,
    textEllipsis = true,
    ...restProps
}) => {
    const { layoutMode } = useTableContext();
    const cellModel = useTableEntity((tableModel) =>
        tableModel.getHeader().getOrCreateCell({ props: { index, width } })
    );

    useLayoutEffect(() => {
        cellModel?.updateProps({ index, width });
    }, [cellModel, index, width]);

    return (
        <div
            ref={cellModel.getRef()}
            style={layoutMode === 'fixed' ? { width, ...style } : style}
            data-component={'header-cell'}
            className={cx(className, { [s.textEllipsis]: textEllipsis })}
            {...restProps}
        >
            {children}
        </div>
    );
};
