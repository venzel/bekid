interface IStrategysConfigDTO {
    cache_strategyr: string;
    mail_strategy: string;
    queue_strategy: string;
    storage_strategy: string;
    generate_id_strategy: string;
}

const _generateIdStrategy = (): string => {
    const env = process.env.GENERATE_ID_STRATEGY;
    if (!env) throw new Error('Error in var ambient: GENERATE_ID_STRATEGY!');
    return env;
};

const _cacheStrategy = (): string => {
    const env = process.env.CACHE_STRATEGY;
    if (!env) throw new Error('Error in var ambient: CACHE_STRATEGY!');
    return env;
};

const _mailStrategy = (): string => {
    const env = process.env.MAIL_STRATEGY;
    if (!env) throw new Error('Error in var ambient: MAIL_STRATEGY!');
    return env;
};

const _queueStrategy = (): string => {
    const env = process.env.QUEUE_STRATEGY;
    if (!env) throw new Error('Error in var ambient: QUEUE_STRATEGY!');
    return env;
};

const _storageStrategy = (): string => {
    const env = process.env.STORAGE_STRATEGY;
    if (!env) throw new Error('Error in var ambient: STORAGE_STRATEGY!');
    return env;
};

const configs: IStrategysConfigDTO = {
    generate_id_strategy: _generateIdStrategy(),
    cache_strategyr: _cacheStrategy(),
    mail_strategy: _mailStrategy(),
    queue_strategy: _queueStrategy(),
    storage_strategy: _storageStrategy(),
};

const { generate_id_strategy, cache_strategyr, mail_strategy, queue_strategy, storage_strategy } = configs;

export { generate_id_strategy };
export { cache_strategyr };
export { mail_strategy };
export { queue_strategy };
export { storage_strategy };
