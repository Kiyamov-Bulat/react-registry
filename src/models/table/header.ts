import { BaseTableEntity } from './base';
import { TableModel } from './table';
import { HeaderCellModel } from './header-cell';
import { CellModel } from './cell';
import { TableEntity, TableRef } from '../types';

export class HeaderModel extends BaseTableEntity {
    getGridColumnTemplateStyle() {
        const widthList = (this.getProps().cellWidthList as string[]) || [];
        const gridTemplateColumns = widthList.reduce(
            (acc, elem) => `${acc} ${elem}`,
            ''
        );

        return { gridTemplateColumns };
    }

    saveCellWidth(index: number, width: string) {
        console.log(index, width);
        this.updateProps((props) => {
            const cellWidthList = [...props.cellWidthList];

            cellWidthList[index] = width;

            return { ...props, cellWidthList };
        });
    }

    getTable(): TableModel {
        return this.getParent() as TableModel;
    }

    getCell(index: number): CellModel {
        return this.getChild(index) as CellModel;
    }

    getCellList(): HeaderCellModel[] {
        return super.getChildren() as HeaderCellModel[];
    }

    createCell(index?: number, ref?: TableRef): HeaderCellModel {
        return this.createChild(index, ref) as HeaderCellModel;
    }

    getOrCreateCell(index: number, ref?: TableRef): HeaderCellModel {
        return super.getOrCreateChild(index, ref) as HeaderCellModel;
    }

    protected createEmptyChild(): HeaderCellModel {
        return HeaderCellModel.empty();
    }
}
