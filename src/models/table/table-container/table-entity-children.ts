import { TableEntity } from '../../types';

export class TableEntityChildren {
    private children: Record<string, TableEntity> = {};
    private list: TableEntity[] = [];
    private dirty: boolean = false;

    static empty() {
        return new TableEntityChildren();
    }

    get(id: string): TableEntity | null {
        return this.children[id] ?? null;
    }

    remove(child: TableEntity) {
        this.dirty = true;
        delete this.children[child.getId()];
    }

    add(child: TableEntity) {
        this.dirty = true;
        this.children[child.getId()] = child;
    }

    asList(): TableEntity[] {
        if (this.dirty) {
            const ls = Object.values(this.children);

            this.dirty = false;

            this.list = ls.filter((entity) => !entity.isDestroyed());
            this.list.sort((a, b) => a.getProps().index - b.getProps().index);
        }

        return this.list;
    }

    getByIndex(index: number): TableEntity | null {
        for (const key in this.children) {
            if (this.children[key].getProps().index === index) {
                return this.children[key];
            }
        }

        return null;
    }

    reset() {
        this.dirty = true;
        this.children = {};
    }
}
