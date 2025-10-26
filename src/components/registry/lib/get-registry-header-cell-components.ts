import { RenderHeaderCell } from '../types';
import { RegistryHeaderCell } from '../ui/registry-header-cell';

export const getRegistryHeaderCellComponents = <T extends object>(
    renderHeaderCell?: RenderHeaderCell<T>
) => {
    return {
        Component: RegistryHeaderCell,
        Wrapper: null,
        Content: null,
        ...renderHeaderCell,
    };
};
