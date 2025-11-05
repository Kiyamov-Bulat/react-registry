import {
    TableContainer,
    TableEntity,
    TableEntityEvent,
    TableEntityProps,
    TableRef,
} from './types';
import { createRef, SetStateAction } from 'react';
import EventEmitter from 'eventemitter3';
import { nanoid } from 'nanoid';

type BaseTableEntityConstructorParams = {
    parent: TableContainer | null;
};

export class BaseTableEntity
    extends EventEmitter<TableEntityEvent>
    implements TableEntity
{
    private readonly id: string;
    private readonly ref: TableRef;
    private parent: TableContainer | null;
    private oldParent: TableContainer | null; //parent before deletion
    private props: TableEntityProps;
    private _isDestroyed: boolean;

    constructor({ parent = null }: Partial<BaseTableEntityConstructorParams> = {}) {
        super();

        this.oldParent = null;
        this.parent = parent;
        this.ref = createRef();
        this.props = {};
        this.id = nanoid();
        this._isDestroyed = false;
    }

    static empty<T extends typeof BaseTableEntity>(this: T) {
        return new this() as InstanceType<T>;
    }

    static of<T extends typeof BaseTableEntity>(
        this: T,
        parent: TableContainer
    ): InstanceType<T> {
        return new this({ parent }) as InstanceType<T>;
    }

    restore() {
        if (!this.isDestroyed()) return;

        this._isDestroyed = false;

        if (this.oldParent) {
            this.oldParent.addChild?.(this);
            this.oldParent = null;
        }
    }

    destroy() {
        if (this.isDestroyed()) return;

        this._isDestroyed = true;
        this.oldParent = this.parent;
        this.parent?.removeChild?.(this);
    }

    isDestroyed(): boolean {
        return this._isDestroyed;
    }

    getId(): string {
        return this.id;
    }

    getParent(): TableContainer | null {
        return this.parent;
    }

    getRef(): TableRef {
        return this.ref;
    }

    setParent(parent: TableContainer | null): void {
        this.parent = parent;
    }

    getProps(): TableEntityProps {
        return this.props;
    }

    updateProps(props: SetStateAction<Partial<TableEntityProps>>) {
        if (typeof props === 'function') {
            this.props = props(this.props);
        } else {
            this.props = { ...this.props, ...props };
        }
        this.emit(TableEntityEvent.UPDATE_PROPS, this.props);
    }
}
