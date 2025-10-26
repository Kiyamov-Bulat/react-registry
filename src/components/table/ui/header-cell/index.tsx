import { FC, useLayoutEffect, useRef } from 'react';
import { useTableEntity } from '../../lib';
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
    const ref = useRef<HTMLDivElement>(null);
    const cellModel = useTableEntity((tableModel) =>
        tableModel.getOrCreateHeader().createCell({ ref, props: { index, width } })
    );

    useLayoutEffect(() => {
        cellModel.updateProps({ index, width });
    }, [cellModel, index, width]);

    return (
        <div
            ref={ref}
            style={{ width, ...style }}
            data-component={'header-cell'}
            className={cx(className, {
                [s.textEllipsis]: textEllipsis,
            })}
            {...restProps}
        >
            {children}
        </div>
    );
};
