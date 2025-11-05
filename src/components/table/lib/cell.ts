import { CSSProperties, useCallback } from 'react';
import { useTableEntityProps } from './props';
import { TableEntityProps } from './models';
import { useTableContext } from './context';

type UseTableCellStyleParams = {
    outerStyle?: CSSProperties;
    colIndex: number;
};

export const useTableCellStyle = ({
    colIndex,
    outerStyle,
}: UseTableCellStyleParams) => {
    const { tableModel, layoutMode } = useTableContext();
    const isFixedMode = layoutMode === 'fixed';
    const width = useTableEntityProps(tableModel.getHeader().getCell(colIndex), {
        selector: useCallback((props?: TableEntityProps) => props?.width, []),
        enabled: isFixedMode,
    });

    return isFixedMode ? { ...outerStyle, width } : outerStyle;
};
