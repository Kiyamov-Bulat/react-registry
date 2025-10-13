import { BaseTableEntity } from './base';
import { HeaderModel } from './header';

export type HeaderCellProps = {
    index: number;
    width: string;
};

export class HeaderCellModel extends BaseTableEntity {
    getHeader(): HeaderModel {
        return this.getParent() as HeaderModel;
    }

    getProps(): HeaderCellProps {
        return super.getProps() as HeaderCellProps;
    }

    getIndex() {
        return this.getProps().index;
    }
}
