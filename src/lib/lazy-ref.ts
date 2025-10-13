import { RefObject, useRef } from 'react';

const SENTINEL = {};

type UseLazyRefOptions<T> = {
    isReinitializationNeeded?: (entity: T) => boolean;
};

export const useLazyRef = <T>(
    init: () => T,
    { isReinitializationNeeded }: UseLazyRefOptions<T> = {}
) => {
    const ref = useRef<T | typeof SENTINEL>(SENTINEL);

    if (
        ref.current === SENTINEL ||
        isReinitializationNeeded?.(ref.current as T)
    ) {
        ref.current = init();
    }

    return ref as RefObject<T>;
};
