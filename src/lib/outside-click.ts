import { RefObject, useEffect } from 'react';

type RefType = RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[];

type UseOutsideClickOptions = {
    enabled?: boolean;
};

export const useOutsideClick = (
    refs: RefType,
    callback: (event: MouseEvent | TouchEvent) => void,
    { enabled = true }: UseOutsideClickOptions = {}
) => {
    useEffect(() => {
        if (!enabled) return;

        const handleClick = (event: MouseEvent | TouchEvent) => {
            // Приводим refs к массиву для единообразной обработки
            const refArray = Array.isArray(refs) ? refs : [refs];

            // Проверяем, был ли клик ВНУТРИ любого из целевых элементов
            const isInside = refArray.some(
                (ref) => ref.current && ref.current.contains(event.target as Node)
            );

            // Если клик снаружи — вызываем callback
            if (!isInside) {
                callback(event);
            }
        };

        // Добавляем обработчики
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('touchstart', handleClick);

        // Очистка
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('touchstart', handleClick);
        };
    }, [refs, callback, enabled]);
};
