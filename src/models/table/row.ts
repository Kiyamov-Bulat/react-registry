import { BaseTableEntity } from './base';
import { CellModel, CellProps } from './cell';
import { BodyModel } from './body';
import { CreateChildParams } from '../types';

export type RowProps = {
    index: number;
};

export class RowModel extends BaseTableEntity {
    getBody(): BodyModel {
        return super.getParent() as BodyModel;
    }

    getCell(index: number): CellModel | null {
        return this.getChildByIndex(index) as CellModel;
    }

    getCellList(): CellModel[] {
        return super.getChildren().asList() as CellModel[];
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

    protected createEmptyChild(): CellModel {
        return CellModel.empty();
    }
}
