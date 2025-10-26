import { RenderCell } from '../types';
import { RegistryCell } from '../ui/registry-cell';

export const getRegistryCellComponents = <T extends object>(
    renderCell?: RenderCell<T>
) => {
    return {
        Component: RegistryCell,
        Wrapper: null,
        Content: null,
        ...renderCell,
    };
};
