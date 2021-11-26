import { v4 as uuidv4 } from 'uuid';

class GenerateId {
    private static _strategies: any = {
        uuid: () => uuidv4(),
        hash: () => uuidv4().split('-')[0],
    };

    public static strategy(strategy: string): string {
        return this._strategies[strategy]();
    }
}

export { GenerateId };
