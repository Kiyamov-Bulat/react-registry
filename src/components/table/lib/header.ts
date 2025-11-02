import { CSSProperties, useCallback } from 'react';
import { useTableContext } from './context';
import { useTableEntityChildrenProps } from './props';
import { HeaderCellProps } from '../../../models';

type UseTableRowStyleParams = {
    outerStyle?: CSSProperties;
};

export const useTableHeaderStyle = ({ outerStyle }: UseTableRowStyleParams) => {
    const { tableModel, layoutMode } = useTableContext();
    const headerModel = tableModel.getHeader();
    const isGridMode = layoutMode === 'grid';

    const style = useTableEntityChildrenProps(headerModel, {
        selector: useCallback((props?: HeaderCellProps[]) => {
            const cellWidthList = props?.map(({ width }) => width) || [];

            headerModel?.updateProps({ cellWidthList });

            return headerModel?.getGridColumnTemplateStyle();
        }, []),
        enabled: isGridMode,
    });

    return isGridMode ? { ...outerStyle, ...style } : outerStyle;
};
