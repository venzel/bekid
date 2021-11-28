import { v4 as uuidv4 } from 'uuid';

import { generate_id_provider } from '@configs/providers';

class GenerateId {
    private static _strategies: any = {
        uuid: () => uuidv4(),
        hash: () => uuidv4().split('-')[0],
    };

    public static strategy(strategy?: IStrateyId): string {
        return strategy ? this._strategies[strategy]() : this._strategies[generate_id_provider]();
    }
}

export { GenerateId };
