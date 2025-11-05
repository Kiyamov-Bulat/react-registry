import { BaseTableEntity } from './base';
import { HeaderModel } from './header';
import { BodyModel } from './body';
import { TableContainer } from './types';

export class TableModel extends BaseTableEntity implements TableContainer {
    private header: HeaderModel = HeaderModel.of(this);
    private body: BodyModel = BodyModel.of(this);

    getHeader(): HeaderModel {
        return this.header;
    }

    getBody(): BodyModel {
        return this.body;
    }

    getChildren() {
        return [this.header, this.body];
    }
}
