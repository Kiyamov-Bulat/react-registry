import { BaseTableEntity } from './base';
import { CellModel } from './cell';
import { BodyModel } from './body';
import { TableRef } from '../types';

export class RowModel extends BaseTableEntity {
    getBody(): BodyModel {
        return super.getParent() as BodyModel;
    }

    getCell(index: number): CellModel | null {
        return this.getChild(index) as CellModel;
    }

    getCellList(): CellModel[] {
        return super.getChildren() as CellModel[];
    }

    createCell(index?: number, ref?: TableRef): CellModel {
        return this.createChild(index, ref) as CellModel;
    }

    getOrCreateCell(index: number, ref?: TableRef): CellModel {
        return this.getOrCreateChild(index, ref) as CellModel;
    }

    protected createEmptyChild(): CellModel {
        return CellModel.empty();
    }
}
