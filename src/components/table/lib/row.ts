import { useTableContext } from './context';
import { useTableEntityProps } from './props';
import { CSSProperties, useCallback } from 'react';

type UseTableRowStyleParams = {
    outerStyle?: CSSProperties;
};

export const useTableRowStyle = ({ outerStyle }: UseTableRowStyleParams) => {
    const { tableModel, layoutMode } = useTableContext();
    const header = tableModel.getHeader();
    const isGridMode = layoutMode === 'grid';
    const style = useTableEntityProps(header, {
        selector: useCallback(() => header.getGridColumnTemplateStyle(), [header]),
        enabled: isGridMode,
    });

    return isGridMode ? { ...outerStyle, ...style } : outerStyle;
};
