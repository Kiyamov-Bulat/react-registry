import { CellModel, CellProps } from './cell';
import { BodyModel } from './body';
import { CreateChildParams } from '../types';
import { BaseTableContainer } from './table-container';

export type RowProps = {
    index: number;
};

export class RowModel extends BaseTableContainer {
    getBody(): BodyModel {
        return super.getParent() as BodyModel;
    }

    getCell(index: number): CellModel | null {
        return this.getChildByIndex(index) as CellModel;
    }

    getCellList(): CellModel[] {
        return super.getChildren() as CellModel[];
    }

    createCell(params?: CreateChildParams<CellProps>): CellModel {
        return this.createChild(params) as CellModel;
    }

    getOrCreateCell(params?: CreateChildParams<CellProps>): CellModel {
        return this.getOrCreateChild(params) as CellModel;
    }

    getProps(): RowProps {
        return super.getProps() as RowProps;
    }

    getIndex() {
        return this.getProps().index;
    }

    removeCell(cell: CellModel) {
        this.removeChild(cell);
    }

    protected createEmptyChild(): CellModel {
        return CellModel.empty();
    }
}
