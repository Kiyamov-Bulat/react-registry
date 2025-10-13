import {
    createContext,
    Dispatch,
    RefObject,
    SetStateAction,
    useContext,
} from 'react';

export type DropdownContext = {
    opened: boolean;
    setOpened: Dispatch<SetStateAction<boolean>>;
    anchorRef: RefObject<HTMLDivElement | null>;
};

export const dropdownContext = createContext<DropdownContext>({
    anchorRef: { current: null },
    opened: false,
    setOpened: () => {},
});

export const useDropdownContext = () => useContext(dropdownContext);
