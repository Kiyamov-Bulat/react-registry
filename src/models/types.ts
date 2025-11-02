import { RefObject, SetStateAction } from 'react';
import EventEmitter from 'eventemitter3';
import { TableEntityChildren } from './table/entity-with-children';

export type TableRef = RefObject<HTMLDivElement | null>;

export type TableEntityProps = Record<string, any>;

export type CreateChildParams<T extends TableEntityProps = TableEntityProps> = {
    props?: T;
};

export interface TableEntity extends EventEmitter {
    getId(): string;
    getParent(): TableEntity | null;
    getRef(): TableRef;
    setParent(parent: TableEntity | null): void;
    getProps(): TableEntityProps;
    updateProps(props: SetStateAction<Partial<TableEntityProps>>): void;
    restore(): void;
    destroy(): void;
    isDestroyed(): boolean;
}

export interface TableEntityWithChildren extends TableEntity {
    getChildren(): TableEntityChildren;
}

export enum TableEntityEvent {
    UPDATE_PROPS = '@table-entity-event/UPDATE-PROPS',
    UPDATE_CHILDREN = '@table-entity-event/UPDATE-CHILDREN',
}

export type NullableTableEntity = TableEntity | null | undefined;
export type NullableTableEntityWithChildren =
    | TableEntityWithChildren
    | null
    | undefined;
