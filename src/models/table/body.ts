import { BaseTableEntity } from './base';
import { RowModel, RowProps } from './row';
import { TableModel } from './table';
import { CreateChildParams } from '../types';

export class BodyModel extends BaseTableEntity {
    getTable(): TableModel {
        return this.getParent() as TableModel;
    }

    getRow(index: number): RowModel | null {
        return this.getChildByIndex(index) as RowModel;
    }

    // @TODO
    getRowList(): RowModel[] {
        return this.getChildren().asList() as RowModel[];
    }

    createRow(params?: CreateChildParams<RowProps>): RowModel {
        return this.createChild(params) as RowModel;
    }

    getOrCreateRow(params?: CreateChildParams<RowProps>): RowModel {
        return this.getOrCreateChild(params) as RowModel;
    }

    protected createEmptyChild(): RowModel {
        return RowModel.empty();
    }
}
