import { RefObject, useEffect, useLayoutEffect, useState } from 'react';

type UsePopupPositionParams = {
    local: boolean;
    anchorRef: RefObject<HTMLElement | null>;
};

const GAP = 8;

export const usePopupPosition = ({
    local,
    anchorRef,
}: UsePopupPositionParams) => {
    const [position, setPosition] = useState({ left: 0, top: 0 });

    useLayoutEffect(() => {
        if (!anchorRef?.current) return;

        const anchorRect = anchorRef.current.getBoundingClientRect();

        if (local) {
            setPosition({
                left: 0,
                top: anchorRect.height + GAP,
            });
        } else {
            setPosition({
                left: anchorRect.left,
                top: anchorRect.top + anchorRect.height + GAP,
            });
        }
    }, [anchorRef, local]);

    return position;
};
