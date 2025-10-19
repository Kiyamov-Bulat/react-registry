import {
    CreateChildParams,
    TableEntity,
    TableEntityEvent,
    TableEntityProps,
    TableRef,
} from '../types';
import { SetStateAction } from 'react';
import EventEmitter from 'eventemitter3';
import { nanoid } from 'nanoid';
import { TableEntityChildren } from './table-entity-children';

type BaseTableEntityConstructorParams = {
    parent: TableEntity | null;
    children: TableEntityChildren;
    ref: TableRef | null;
};

export class BaseTableEntity
    extends EventEmitter<TableEntityEvent>
    implements TableEntity
{
    private readonly id: string;
    private readonly children: TableEntityChildren;
    private ref: TableRef | null;
    private parent: TableEntity | null;
    private props: TableEntityProps;
    private _isDestroyed: boolean;

    constructor({
        parent = null,
        children,
        ref = null,
    }: Partial<BaseTableEntityConstructorParams> = {}) {
        super();

        this.parent = parent;
        this.ref = ref;
        this.children = children ?? TableEntityChildren.empty();
        this.props = {};
        this.id = nanoid();
        this._isDestroyed = false;
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

    static fromRef<T extends typeof BaseTableEntity>(this: T, ref?: TableRef) {
        return new this({ ref }) as InstanceType<T>;
    }

    destroy() {
        if (this.isDestroyed()) return;

        this._isDestroyed = true;
        this.removeAllListeners();
        this.parent?.removeChild(this);
        //@TODO NOT DESTROY?
        this.children.asList().map((child) => this.removeChild(child));
    }

    isDestroyed(): boolean {
        return this._isDestroyed;
    }

    getId(): string {
        return this.id;
    }

    getParent(): TableEntity | null {
        return this.parent;
    }

    getChildren(): TableEntityChildren {
        return this.children;
    }

    getChild(id: string): TableEntity | null {
        return this.children.get(id);
    }

    getChildByIndex(index: number): TableEntity | null {
        return this.children.getByIndex(index);
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

    protected addChild(child: TableEntity): void {
        this.children.add(child);

        child.setParent(this);
    }

    removeChild(child: TableEntity): void {
        this.children.remove(child);

        child.setParent(null);
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

    protected createChild({ ref, props }: CreateChildParams = {}): TableEntity {
        const child = this.createEmptyChild();

        if (ref) {
            child.setRef(ref);
        }
        if (props) {
            child.updateProps(props);
        }

        this.addChild(child);

        return child;
    }

    protected getOrCreateChild({ ref, props }: CreateChildParams = {}): TableEntity {
        const index = props?.index;
        const child = typeof index === 'number' ? this.getChildByIndex(index) : null;

        if (child && ref) {
            child.setRef(ref);
        }

        return child ?? this.createChild({ ref, props });
    }
}
