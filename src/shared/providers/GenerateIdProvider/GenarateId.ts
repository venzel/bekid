import { v4 as uuidv4 } from 'uuid';

type IStrateyId = 'hash' | 'uuid' | 'random';

class GenerateId {
    private static _strategies: any = {
        uuid: () => uuidv4(),
        hash: () => uuidv4().split('-')[0],
    };

    public static strategy(strategy?: IStrateyId): string {
        const generateIdProvider = process.env.GENERATE_ID_PROVIDER || 'hash';

        return strategy ? this._strategies[strategy]() : this._strategies[generateIdProvider]();
    }
}

export { GenerateId };
