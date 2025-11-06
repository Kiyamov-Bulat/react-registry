export type EventHandler = (...args: any[]) => void;

type EventDict<TEvent extends string> = Partial<Record<TEvent, EventHandler[]>>;

export class EventEmitter<TEvent extends string = string> {
    private events: EventDict<TEvent> = {};

    /**
     * Subscribe to an event.
     */
    on(event: TEvent, handler: EventHandler): this {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(handler);
        return this;
    }

    /**
     * Subscribe to an event once.
     */
    once(event: TEvent, handler: EventHandler): this {
        const onceWrapper: EventHandler = (...args) => {
            handler(...args);
            this.off(event, onceWrapper);
        };
        return this.on(event, onceWrapper);
    }

    /**
     * Unsubscribe from an event.
     */
    off(event: TEvent, handler?: EventHandler): this {
        if (!this.events[event]) return this;

        if (handler) {
            this.events[event] = this.events[event].filter((h) => h !== handler);
        } else {
            delete this.events[event];
        }
        return this;
    }

    /**
     * Emit an event.
     */
    emit(event: TEvent, ...args: any[]): boolean {
        const handlers = this.events[event];
        if (!handlers || handlers.length === 0) return false;

        // Clone to avoid issues if handler modifies the list
        const handlersCopy = [...handlers];
        for (const handler of handlersCopy) {
            handler(...args);
        }
        return true;
    }

    /**
     * Remove all listeners.
     */
    removeAllListeners(event?: TEvent): this {
        if (event) {
            delete this.events[event];
        } else {
            this.events = {};
        }
        return this;
    }
}
