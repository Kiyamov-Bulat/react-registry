import { BaseTableEntity } from './base';
import { RowModel } from './row';
import { TableModel } from './table';
import { TableRef } from '../types';

export class BodyModel extends BaseTableEntity {
    getTable(): TableModel {
        return this.getParent() as TableModel;
    }

    getRow(index: number): RowModel | null {
        return this.getChild(index) as RowModel;
    }

    getRowList(): RowModel[] {
        return this.getChildren() as RowModel[];
    }

    createRow(index?: number, ref?: TableRef): RowModel {
        return this.createChild(index, ref) as RowModel;
    }

    getOrCreateRow(index: number, ref?: TableRef): RowModel {
        return this.getOrCreateChild(index, ref) as RowModel;
    }

    protected createEmptyChild(): RowModel {
        return RowModel.empty();
    }
}
