import { RefObject, SetStateAction } from 'react';
import EventEmitter from 'eventemitter3';
import { TableEntityChildren } from './table';

export type TableRef = RefObject<HTMLElement | null>;

export type TableEntityProps = Record<string, any>;

export type CreateChildParams<T extends TableEntityProps = TableEntityProps> = {
    ref?: TableRef;
    props?: T;
};

export interface TableEntity extends EventEmitter {
    getId(): string;
    getParent(): TableEntity | null;
    getChildren(): TableEntityChildren;
    getRef(): TableRef | null;
    setRef(ref: TableRef | null): void;
    setParent(parent: TableEntity | null): void;
    removeChild(child: TableEntity): void;
    getProps(): TableEntityProps;
    updateProps(props: SetStateAction<Partial<TableEntityProps>>): void;
    destroy(): void;
    isDestroyed(): boolean;
}

export enum TableEntityEvent {
    UPDATE_PROPS = '@table-entity-event/UPDATE-PROPS',
}
