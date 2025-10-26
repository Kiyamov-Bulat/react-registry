import { RefObject, useLayoutEffect, useState } from 'react';
import { PopupAlign } from '../types';

type UsePopupPositionParams = {
    anchorRef: RefObject<HTMLElement | null>;
    popupRef: RefObject<HTMLElement | null>;
    local: boolean;
    align: PopupAlign;
    enabled: boolean;
};

const GAP = 8;

export const usePopupPosition = ({
    enabled,
    local,
    anchorRef,
    popupRef,
    align,
}: UsePopupPositionParams) => {
    const [position, setPosition] = useState({ left: 0, top: 0 });

    useLayoutEffect(() => {
        if (!enabled || !anchorRef.current || !popupRef.current) return;

        const anchorRect = anchorRef.current.getBoundingClientRect();
        const popupRect = popupRef.current.getBoundingClientRect();

        const getLeft = () => {
            switch (align) {
                case 'start':
                    return 0;
                case 'center':
                    return (anchorRect.width - popupRect.width) / 2;
                case 'end':
                    return anchorRect.width - popupRect.width;
            }
        };

        console.log(align, getLeft());

        if (local) {
            setPosition({
                left: getLeft(),
                top: anchorRect.height + GAP,
            });
        } else {
            setPosition({
                left: anchorRect.left,
                top: anchorRect.top + anchorRect.height + GAP,
            });
        }
    }, [enabled, anchorRef, popupRef, local, align]);

    return position;
};
