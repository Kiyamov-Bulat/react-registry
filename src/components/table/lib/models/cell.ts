import { BaseTableEntity } from './base';
import { RowModel } from './row';

export type CellProps = {
    index: number;
};

export class CellModel extends BaseTableEntity {
    getRow(): RowModel {
        return this.getParent() as RowModel;
    }

    getProps(): CellProps {
        return super.getProps() as CellProps;
    }

    getIndex() {
        return this.getProps().index;
    }
}
