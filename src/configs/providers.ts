interface IProvidersConfigDTO {
    cache_provider: string;
    mail_provider: string;
    queue_provider: string;
    storage_provider: string;
    generate_id_provider: string;
}

const _generateIdProvider = (): string => {
    const env = process.env.GENERATE_ID_PROVIDER;
    if (!env) throw new Error('Error in var ambient: GENERATE_ID_PROVIDER!');
    return env;
};

const _cacheProvider = (): string => {
    const env = process.env.CACHE_PROVIDER;
    if (!env) throw new Error('Error in var ambient: CACHE_PROVIDER!');
    return env;
};

const _mailProvider = (): string => {
    const env = process.env.MAIL_PROVIDER;
    if (!env) throw new Error('Error in var ambient: MAIL_PROVIDER!');
    return env;
};

const _queueProvider = (): string => {
    const env = process.env.QUEUE_PROVIDER;
    if (!env) throw new Error('Error in var ambient: QUEUE_PROVIDER!');
    return env;
};

const _storageProvider = (): string => {
    const env = process.env.STORAGE_PROVIDER;
    if (!env) throw new Error('Error in var ambient: STORAGE_PROVIDER!');
    return env;
};

const configs: IProvidersConfigDTO = {
    generate_id_provider: _generateIdProvider(),
    cache_provider: _cacheProvider(),
    mail_provider: _mailProvider(),
    queue_provider: _queueProvider(),
    storage_provider: _storageProvider(),
};

const { generate_id_provider, cache_provider, mail_provider, queue_provider, storage_provider } = configs;

export { generate_id_provider };
export { cache_provider };
export { mail_provider };
export { queue_provider };
export { storage_provider };
