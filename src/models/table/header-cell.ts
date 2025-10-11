import { BaseTableEntity } from './base';
import { HeaderModel } from './header';

export class HeaderCellModel extends BaseTableEntity {
    getHeader(): HeaderModel {
        return this.getParent() as HeaderModel;
    }
}
