import { BaseTableEntity } from './base';
import { TableModel } from './table';
import { HeaderCellModel, HeaderCellProps } from './header-cell';
import { CellModel } from './cell';
import { CreateChildParams } from '../types';

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
        return this.getChildByIndex(index) as CellModel;
    }

    // @TODO
    getCellList(): HeaderCellModel[] {
        return super.getChildren().asList() as HeaderCellModel[];
    }

    createCell(params?: CreateChildParams<HeaderCellProps>): HeaderCellModel {
        return this.createChild(params) as HeaderCellModel;
    }

    getOrCreateCell(
        params?: CreateChildParams<HeaderCellProps>
    ): HeaderCellModel {
        return super.getOrCreateChild(params) as HeaderCellModel;
    }

    protected createEmptyChild(): HeaderCellModel {
        return HeaderCellModel.empty();
    }
}
