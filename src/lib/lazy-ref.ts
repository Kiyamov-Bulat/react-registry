import { RefObject, useRef } from 'react';

const SENTINEL = {};

export const useLazyRef = <T>(init: () => T) => {
    const ref = useRef<T | typeof SENTINEL>(SENTINEL);

    if (ref.current === SENTINEL) {
        ref.current = init();
    }

    return ref as RefObject<T>;
};
