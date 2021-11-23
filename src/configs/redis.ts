interface IRedisConfigDTO {
    redis_host: string;
    redis_port: number;
    redis_key_prefix: string;
    redis_password: string;
}

const _redisHost = (): string => {
    const env = process.env.REDIS_HOST;
    if (!env) throw new Error('Error in var ambient: REDIS_HOST!');
    return env;
};

const _redisPort = (): number => {
    const env = process.env.REDIS_PORT;
    if (!env) throw new Error('Error in var ambient: REDIS_PORT!');
    return Number(env);
};

const _redisKeyPrefix = (): string => {
    const env = process.env.REDIS_KEY_PREFIX;
    if (!env) throw new Error('Error in var ambient: REDIS_KEY_PREFIX!');
    return env + ':';
};

const _redisPasword = (): string => {
    const env = process.env.REDIS_PASSWORD;
    if (!env) throw new Error('Error in var ambient: REDIS_PASSWORD!');
    return env;
};

const config: IRedisConfigDTO = {
    redis_host: _redisHost(),
    redis_port: _redisPort(),
    redis_key_prefix: _redisKeyPrefix(),
    redis_password: _redisPasword(),
};

const { redis_host, redis_port, redis_key_prefix, redis_password } = config;

export { redis_host };
export { redis_port };
export { redis_key_prefix };
export { redis_password };
