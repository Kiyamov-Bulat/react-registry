import { BaseTableEntity } from './base';
import { HeaderModel } from './header';
import { BodyModel } from './body';
import { TableEntity, TableRef } from '../types';

const HEADER_INDEX = 0;
const BODY_INDEX = 1;
type TableChildIndex = typeof HEADER_INDEX | typeof BODY_INDEX;

export class TableModel extends BaseTableEntity {
    getOrCreateHeader(ref?: TableRef): HeaderModel {
        return this.getOrCreateChild(HEADER_INDEX, ref) as HeaderModel;
    }

    getOrCreateBody(ref?: TableRef): BodyModel {
        return this.getOrCreateChild(BODY_INDEX, ref) as BodyModel;
    }

    getBody(): BodyModel | null {
        return this.getChildren()[1] || null;
    }

    getHeader(): HeaderModel | null {
        return this.getChildren()[0] || null;
    }

    getChildren(): [HeaderModel, BodyModel] {
        return super.getChildren() as [HeaderModel, BodyModel];
    }

    protected createChild(
        index?: TableChildIndex,
        ref?: TableRef
    ): TableEntity {
        const child =
            index === HEADER_INDEX ? HeaderModel.empty() : BodyModel.empty();

        if (ref) {
            this.setRef(ref);
        }

        this.addChild(child, index);

        return child;
    }
}
