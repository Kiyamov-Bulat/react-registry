import { BaseTableEntity } from './base';
import { RowModel } from './row';

export class CellModel extends BaseTableEntity {
    getRow(): RowModel {
        return this.getParent() as RowModel;
    }
}
