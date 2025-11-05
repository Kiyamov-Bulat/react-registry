import { FC } from 'react';
import { CellProps } from '../../types';
import { useTableCellStyle, useTableEntity } from '../../lib';
import cx from 'classnames';
import s from './styles.module.scss';

export const Cell: FC<CellProps> = ({
    colIndex,
    rowIndex,
    children,
    className,
    textEllipsis = true,
    style: outerStyle,
    ...restProps
}) => {
    const cellModel = useTableEntity((tableModel) =>
        tableModel
            .getBody()
            .getOrCreateRow({ props: { index: rowIndex } })
            .getOrCreateCell({ props: { index: colIndex } })
    );
    const style = useTableCellStyle({ outerStyle, colIndex });

    return (
        <div
            ref={cellModel.getRef()}
            style={style}
            data-component={'cell'}
            className={cx(className, {
                [s.textEllipsis]: textEllipsis,
            })}
            {...restProps}
        >
            {children}
        </div>
    );
};
