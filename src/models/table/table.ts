import { BaseTableEntity } from './base';
import { HeaderModel } from './header';
import { BodyModel } from './body';

export class TableModel extends BaseTableEntity {
    private header: HeaderModel = HeaderModel.of(this);
    private body: BodyModel = BodyModel.of(this);

    getHeader(): HeaderModel {
        return this.header;
    }

    getBody(): BodyModel {
        return this.body;
    }
}
