import { BaseTableEntity } from '../base';
import { TableEntityChildren } from './table-entity-children';
import { CreateChildParams, TableEntity, TableEntityEvent } from '../../types';

export * from './table-entity-children';

export class BaseTableEntityWithChildren extends BaseTableEntity {
    private children: TableEntityChildren = TableEntityChildren.empty();

    getChildren(): TableEntityChildren {
        return this.children;
    }

    protected removeChild(child: TableEntity): void {
        this.children.remove(child);

        child.setParent(null);
        this.emit(TableEntityEvent.UPDATE_CHILDREN, { type: 'remove' });
    }

    protected addChild(child: TableEntity): void {
        this.children.add(child);

        child.setParent(this);
        this.emit(TableEntityEvent.UPDATE_CHILDREN, { type: 'add' });
    }

    protected getChild(id: string): TableEntity | null {
        return this.children.get(id);
    }

    protected getChildByIndex(index: number): TableEntity | null {
        return this.children.getByIndex(index);
    }

    protected createChild({ props }: CreateChildParams = {}): TableEntity {
        const child = this.createEmptyChild();

        if (props) {
            child.updateProps(props);
        }

        this.addChild(child);

        return child;
    }

    protected getOrCreateChild({ props }: CreateChildParams = {}): TableEntity {
        const index = props?.index;
        const child = typeof index === 'number' ? this.getChildByIndex(index) : null;

        return child ?? this.createChild({ props });
    }

    protected createEmptyChild(): TableEntity {
        throw new Error('Not implemented');
    }
}
