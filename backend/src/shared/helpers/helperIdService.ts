import { v4 as uuidv4 } from 'uuid';

const environment = process.env.NODE_ENV || 'development';
const generate_id_strategy = process.env.GENERATE_ID_STRATEGY || 'hash';

const idGenerator = (strategy?: string) => {
    const randomId = () => {
        const min = 1,
            max = 1000;

        const random = (min + Math.floor((max - min) * Math.random())).toString();

        const timestamp = Date.now().toString();

        return random + timestamp;
    };

    const strategies: any = {
        uuid: () => uuidv4(),
        mongo: () => uuidv4(),
        random: () => randomId(),
        hash: () => uuidv4().split('-')[0],
    };

    const strategyValid = strategy ? strategies.hasOwnProperty(strategy) : strategies.hasOwnProperty(generate_id_strategy);

    if (!strategyValid) {
        throw new Error(`Strategy ${strategyValid} not found!`);
    }

    const strategySelected = strategies[strategy || generate_id_strategy];

    const strategyExecuted = strategySelected();

    return strategyExecuted;
};

const idValidator = (id: string, strategy?: string): boolean => {
    if (!id) {
        return false;
    }

    if (environment === 'development') {
        return true;
    }

    const strategies: any = {
        uuid: () => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
        mongo: () => /^[0-9a-fA-F]{24}$/,
        random: () => /^[0-9a-fA-F]{8}$/,
        hash: () => /^[0-9a-fA-F]{8}$/,
    };

    const strategyValid = strategy ? strategies.hasOwnProperty(strategy) : strategies.hasOwnProperty(generate_id_strategy);

    if (!strategyValid) {
        throw new Error(`Strategy ${strategyValid} not found!`);
    }

    const strategySelected = strategies[strategy || generate_id_strategy];

    const strategyExecuted = strategySelected();

    if (!strategyExecuted.test(id)) {
        return false;
    }

    return true;
};

export { idGenerator, idValidator };
