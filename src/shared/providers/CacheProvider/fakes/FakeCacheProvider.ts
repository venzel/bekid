import { ICacheProvider } from '../models/ICacheProvider';
import { redis_key_prefix } from '@configs/redis';

interface ICache {
    key: string;
    value: string;
    time_to_expires: number;
}

class FakeCacheProvider implements ICacheProvider {
    private _cache: ICache[];

    constructor() {
        this._cache = [];
    }

    private _findIndexByKey(key: string): number {
        return this._cache.findIndex((data) => data.key === key);
    }

    private _findByPrefix(prefix: string): number[] | null {
        const caches: number[] = [];

        this._cache.forEach((cacheValue, cacheIndex) => {
            const parts = cacheValue.value.split(':');

            if (parts[1] === prefix) {
                caches.push(cacheIndex);
            }
        });

        return caches.length ? caches : null;
    }

    public async save(key: string, value: string, time_to_expires: number): Promise<void> {
        value = JSON.stringify(`${redis_key_prefix}:${value}`);

        const dataCache = { key, value, time_to_expires };

        this._cache.push(dataCache);
    }

    public async findByKey(key: string): Promise<string | null> {
        const dataCacheIndex: number = this._findIndexByKey(key);

        return dataCacheIndex !== -1 ? JSON.parse(this._cache[dataCacheIndex].value) : null;
    }

    public async invalidate(key: string): Promise<void> {
        const dataCacheIndex: number = this._findIndexByKey(key);

        if (dataCacheIndex !== -1) {
            this._cache.splice(dataCacheIndex, 1);
        }
    }

    public async clearAllCacheByPrefix(prefix: string): Promise<void> {
        const caches: number[] | null = this._findByPrefix(prefix);

        if (caches) {
            caches.forEach((cacheIndex) => this._cache.splice(cacheIndex, 1));
        }
    }
}

export { FakeCacheProvider };
