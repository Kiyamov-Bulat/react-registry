import { NullableTableEntity } from '../../../models';
import { useLayoutEffect, useState } from 'react';

export type EmitterSelector<T> = (...args: any[]) => T;
export type UseEmitterParams<T> = {
    event: string;
    tableEntity: NullableTableEntity;
    selector: EmitterSelector<T>;
    enabled?: boolean;
    initialState?: T | (() => T);
};

export const useEmitter = <T>({
    event,
    tableEntity,
    selector,
    enabled = true,
    initialState = selector,
}: UseEmitterParams<T>) => {
    const [state, setState] = useState(initialState);

    useLayoutEffect(() => {
        if (!enabled) return;

        const setStateWrapper = (...args: unknown[]) =>
            setState((prevState) => selector(...args) ?? prevState);

        setStateWrapper();

        tableEntity?.on(event, setStateWrapper);

        return () => {
            tableEntity?.off(event, setStateWrapper);
        };
    }, [enabled, event, tableEntity, selector]);

    return state;
};
