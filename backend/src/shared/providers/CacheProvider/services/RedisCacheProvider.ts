import { ICacheProvider } from '../models/ICacheProvider';
import IORedis, { Redis } from 'ioredis';
import { redis_host, redis_port, redis_key_prefix, redis_password } from '@configs/redis';
import { environment } from '@configs/geral';

class RedisCacheProvider implements ICacheProvider {
    private _cache: Redis;

    constructor() {
        const host = environment === 'development' ? 'localhost' : redis_host;

        this._cache = new IORedis(redis_port, host, {
            keyPrefix: redis_key_prefix,
            password: redis_password,
        });
    }

    public async save(key: string, value: string, time_to_expires: number): Promise<void> {
        await this._cache.set(key, value, 'EX', time_to_expires);
    }

    public async findByKey(key: string): Promise<string | null> {
        const cache: string | null = await this._cache.get(key);

        return cache || null;
    }

    public async invalidate(key: string): Promise<void> {
        await this._cache.del(key);
    }

    public async clearAllCacheByPrefix(prefix: string): Promise<void> {
        const keys: string[] = await this._cache.keys(`${redis_key_prefix}:${prefix}:*`);

        if (!keys.length) return;

        const keysWithoutPrefix = keys.map((key) => key.replace(`${redis_key_prefix}:`, ''));

        await this._cache.del(keysWithoutPrefix);
    }
}

export { RedisCacheProvider };
