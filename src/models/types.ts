import { RefObject, SetStateAction } from 'react';
import EventEmitter from 'eventemitter3';

export type TableRef = RefObject<HTMLElement | null>;

export type TableEntityProps = Record<string, any>;

export interface TableEntity extends EventEmitter {
    getId(): string;
    getParent(): TableEntity | null;
    getChildren(): TableEntity[];
    getRef(): TableRef | null;
    setRef(ref: TableRef | null): void;
    setParent(parent: TableEntity | null): void;
    addChild(child: TableEntity, index?: number): void;
    removeChild(child: TableEntity): void;
    getProps(): TableEntityProps;
    updateProps(props: SetStateAction<Partial<TableEntityProps>>): void;
    destroy(): void;
}

export enum TableEntityEvent {
    UPDATE_PROPS = '@table-entity-event/UPDATE-PROPS',
}
