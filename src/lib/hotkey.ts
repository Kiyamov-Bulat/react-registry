// hooks/useHotkey.ts
import { useEffect, useCallback } from 'react';

type Key = string;
type KeyModifier = 'ctrl' | 'shift' | 'alt' | 'meta';
type Hotkey = Key | `${KeyModifier}+${Key}` | `${KeyModifier}+${KeyModifier}+${Key}`; // расширь при необходимости

interface UseHotkeyOptions {
    enabled?: boolean;
    preventDefault?: boolean;
}

const isMac =
    typeof window !== 'undefined' &&
    /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);

// Нормализуем хоткей: Ctrl → Cmd на Mac
const normalizeHotkey = (hotkey: Hotkey): string => {
    if (!isMac) return hotkey.toLowerCase();
    return hotkey.toLowerCase().replace('ctrl', 'meta').replace('cmd', 'meta');
};

// Проверяем, совпадает ли событие с хоткеем
const isHotkeyMatch = (event: KeyboardEvent, hotkey: string): boolean => {
    const keys = hotkey.split('+').sort();
    const pressed: string[] = [];

    if (event.ctrlKey) pressed.push('ctrl');
    if (event.shiftKey) pressed.push('shift');
    if (event.altKey) pressed.push('alt');
    if (event.metaKey) pressed.push('meta');

    // Код клавиши (например, 'k', 'escape')
    const key = event.key.toLowerCase();
    pressed.push(key);

    // Сортируем для сравнения
    return pressed.sort().join('+') === keys.join('+');
};

export const useHotkey = (
    hotkey: Hotkey,
    callback: (event: KeyboardEvent) => void,
    options: UseHotkeyOptions = {}
) => {
    const { enabled = true, preventDefault = true } = options;

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (!enabled) return;

            const normalized = normalizeHotkey(hotkey);

            if (isHotkeyMatch(event, normalized)) {
                if (preventDefault) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                callback(event);
            }
        },
        [hotkey, callback, enabled, preventDefault]
    );

    useEffect(() => {
        if (!enabled) return;

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown, enabled]);
};
