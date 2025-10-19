import { TableEntity } from '../types';

export class TableEntityChildren {
    private children: Record<string, TableEntity> = {};

    static empty() {
        return new TableEntityChildren();
    }

    get(id: string): TableEntity | null {
        return this.children[id] ?? null;
    }

    remove(child: TableEntity) {
        delete this.children[child.getId()];
    }

    add(child: TableEntity) {
        this.children[child.getId()] = child;
    }

    asList(): TableEntity[] {
        return Object.values(this.children).sort(
            (a, b) => a.getProps().index - b.getProps().index
        );
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
        this.children = {};
    }
}
