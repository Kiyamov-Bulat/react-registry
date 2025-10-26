import { RefObject, useLayoutEffect, useState } from 'react';
import { PopupAlign } from '../types';
import { clamp } from '../../../lib/clamp';

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

        const getLeft = (initialLeft = 0) => {
            switch (align) {
                case 'start':
                    return initialLeft;
                case 'center':
                    return initialLeft + (anchorRect.width - popupRect.width) / 2;
                case 'end':
                    return initialLeft + anchorRect.width - popupRect.width;
            }
        };
        const getTop = (initialTop = 0) => initialTop + anchorRect.height + GAP;
        const position = {
            left: getLeft(anchorRect.left),
            top: getTop(anchorRect.top),
        };

        position.left = clamp(position.left, 0, window.innerWidth - popupRect.width);
        position.top = clamp(position.top, 0, window.innerHeight - popupRect.height);

        if (local) {
            position.left = position.left - anchorRect.left;
            position.top = position.top - anchorRect.top;
        }

        setPosition(position);
    }, [enabled, anchorRef, popupRef, local, align]);

    return position;
};
