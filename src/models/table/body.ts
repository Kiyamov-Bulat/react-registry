import { RowModel, RowProps } from './row';
import { TableModel } from './table';
import { CreateChildParams } from '../types';
import { BaseTableContainer } from './table-container';

export class BodyModel extends BaseTableContainer {
    getTable(): TableModel {
        return this.getParent() as TableModel;
    }

    getRow(index: number): RowModel | null {
        return this.getChildByIndex(index) as RowModel;
    }

    getRowList(): RowModel[] {
        return this.getChildren() as RowModel[];
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
