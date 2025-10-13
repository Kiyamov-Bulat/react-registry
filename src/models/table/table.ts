import { BaseTableEntity } from './base';
import { HeaderModel } from './header';
import { BodyModel } from './body';
import { CreateChildParams } from '../types';

type TableChild = HeaderModel | BodyModel;
type TableChildModel = typeof HeaderModel | typeof BodyModel;

export class TableModel extends BaseTableEntity {
    getOrCreateHeader(params?: CreateChildParams): HeaderModel {
        return this.getOrCreateTableChild(HeaderModel, params) as HeaderModel;
    }

    getOrCreateBody(params?: CreateChildParams): BodyModel {
        return this.getOrCreateTableChild(BodyModel, params) as BodyModel;
    }

    getBody(): BodyModel | null {
        return this.getTableChild(BodyModel) as BodyModel;
    }

    getHeader(): HeaderModel | null {
        return this.getTableChild(HeaderModel) as HeaderModel;
    }

    private getTableChild(model: TableChildModel): TableChild | null {
        const children = this.getChildren().asList();
        const child = children.find((child) => child instanceof model);

        return (child as TableChild) || null;
    }

    private getOrCreateTableChild(
        model: TableChildModel,
        { ref, props }: CreateChildParams = {}
    ): TableChild {
        let child = this.getTableChild(model);

        if (child) {
            if (ref) child.setRef(ref);
        } else {
            child = model.fromRef(ref);

            this.addChild(child);
        }

        if (props) this.updateProps(props);

        return child;
    }
}
