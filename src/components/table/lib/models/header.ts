import { TableModel } from './table';
import { HeaderCellModel, HeaderCellProps } from './header-cell';
import { CellModel } from './cell';
import { CreateChildParams } from './types';
import { BaseTableContainer } from './table-container';
import { CSSProperties } from 'react';

export type HeaderProps = {
    cellWidthList?: string[];
};

export class HeaderModel extends BaseTableContainer {
    getGridColumnTemplateStyle(): CSSProperties {
        const widthList = this.getProps().cellWidthList || [];
        const gridTemplateColumns = widthList.reduce(
            (acc, elem) => `${acc} ${elem}`,
            ''
        );

        return { display: 'grid', gridTemplateColumns };
    }

    getProps(): HeaderProps {
        return super.getProps() as HeaderProps;
    }

    getTable(): TableModel {
        return this.getParent() as TableModel;
    }

    getCell(index: number): CellModel | null {
        return this.getChildByIndex(index) as CellModel;
    }

    getCellList(): HeaderCellModel[] {
        return super.getChildren() as HeaderCellModel[];
    }

    createCell(params?: CreateChildParams<HeaderCellProps>): HeaderCellModel {
        return this.createChild(params) as HeaderCellModel;
    }

    getOrCreateCell(params?: CreateChildParams<HeaderCellProps>): HeaderCellModel {
        return super.getOrCreateChild(params) as HeaderCellModel;
    }

    removeCell(cell: HeaderCellModel) {
        this.removeChild(cell);
    }

    protected createEmptyChild(): HeaderCellModel {
        return HeaderCellModel.empty();
    }
}
