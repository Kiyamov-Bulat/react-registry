import { RowModel, RowProps } from './row';
import { TableModel } from './table';
import { CreateChildParams } from '../types';
import { BaseTableEntityWithChildren } from './entity-with-children';

export class BodyModel extends BaseTableEntityWithChildren {
    getTable(): TableModel {
        return this.getParent() as TableModel;
    }

    getRow(index: number): RowModel | null {
        return this.getChildByIndex(index) as RowModel;
    }

    getRowList(): RowModel[] {
        return this.getChildren().asList() as RowModel[];
    }

    createRow(params?: CreateChildParams<RowProps>): RowModel {
        return this.createChild(params) as RowModel;
    }

    getOrCreateRow(params?: CreateChildParams<RowProps>): RowModel {
        return this.getOrCreateChild(params) as RowModel;
    }

    removeRow(row: RowModel) {
        this.removeChild(row);
    }

    protected createEmptyChild(): RowModel {
        return RowModel.empty();
    }
}
