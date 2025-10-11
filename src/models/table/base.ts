import {
    TableEntity,
    TableEntityEvent,
    TableEntityProps,
    TableRef,
} from '../types';
import { SetStateAction } from 'react';
import EventEmitter from 'eventemitter3';
import { nanoid } from 'nanoid';
import { RowModel } from './row';
import { Cell } from '../../components/table/ui';

type BaseTableEntityConstructorParams = {
    parent: TableEntity | null;
    children: TableEntity[];
    ref: TableRef | null;
};

export class BaseTableEntity
    extends EventEmitter<TableEntityEvent>
    implements TableEntity
{
    private readonly id: string;
    private children: TableEntity[];
    private ref: TableRef | null;
    private parent: TableEntity | null;
    private props: TableEntityProps;

    constructor({
        parent = null,
        children = [],
        ref = null,
    }: Partial<BaseTableEntityConstructorParams> = {}) {
        super();

        this.parent = parent;
        this.ref = ref;
        this.children = children;
        this.props = {};
        this.id = nanoid();
    }

    static empty<T extends typeof BaseTableEntity>(this: T) {
        return new this() as InstanceType<T>;
    }

    static of<T extends typeof BaseTableEntity>(
        this: T,
        parent: TableEntity,
        ref: TableRef
    ): InstanceType<T> {
        return new this({ parent, ref }) as InstanceType<T>;
    }

    static fromRef<T extends typeof BaseTableEntity>(this: T, ref: TableRef) {
        return new this({ ref }) as InstanceType<T>;
    }

    destroy() {
        this.removeAllListeners();
        this.parent?.removeChild(this);
    }

    getId(): string {
        return this.id;
    }

    getParent(): TableEntity | null {
        return this.parent;
    }

    getChildren(): TableEntity[] {
        return this.children;
    }

    getChild(index: number): TableEntity | null {
        return this.children[index];
    }

    getRef(): TableRef | null {
        return this.ref;
    }

    setRef(ref: TableRef | null): void {
        this.ref = ref;
    }

    setParent(parent: TableEntity | null): void {
        this.parent = parent;
    }

    addChild(child: TableEntity, index?: number): void {
        const children = this.getChildren();

        if (index === undefined) {
            children.push(child);
        } else {
            children[index] = child;
        }

        child.setParent(this);
    }

    removeChild(child: TableEntity): void {
        this.children = this.children.filter(
            (nextChild) => nextChild.getId() !== child.getId()
        );
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
        this.emit(TableEntityEvent.UPDATE_PROPS, this);
    }

    protected createEmptyChild(): TableEntity {
        throw new Error('Not implemented');
    }

    protected createChild(index?: number, ref?: TableRef): TableEntity {
        const child = this.createEmptyChild();

        if (ref) {
            this.setRef(ref);
        }

        this.addChild(child, index);

        return child;
    }

    protected getOrCreateChild(index: number, ref?: TableRef): TableEntity {
        const child = this.getChild(index);

        if (child && ref) {
            child.setRef(ref);
        }

        return child ?? this.createChild(index, ref);
    }
}
