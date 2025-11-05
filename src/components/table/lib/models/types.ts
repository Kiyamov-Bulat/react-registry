import { RefObject, SetStateAction } from 'react';
import EventEmitter from 'eventemitter3';

export type TableRef = RefObject<HTMLDivElement | null>;

export type TableEntityProps = Record<string, any>;

export type CreateChildParams<T extends TableEntityProps = TableEntityProps> = {
    props?: T;
};

export interface TableEntity extends EventEmitter {
    getId(): string;
    getParent(): TableContainer | null;
    getRef(): TableRef;
    setParent(parent: TableContainer | null): void;
    getProps(): TableEntityProps;
    updateProps(props: SetStateAction<Partial<TableEntityProps>>): void;
    restore(): void;
    destroy(): void;
    isDestroyed(): boolean;
}

export interface TableContainer extends TableEntity {
    getChildren(): TableEntity[];
    addChild?(child: TableEntity): void;
    removeChild?(child: TableEntity): void;
}

export enum TableEntityEvent {
    UPDATE_PROPS = '@table-entity-event/UPDATE-PROPS',
    UPDATE_CHILDREN = '@table-entity-event/UPDATE-CHILDREN',
}

export type NullableTableEntity = TableEntity | null | undefined;
export type NullableTableContainer = TableContainer | null | undefined;
