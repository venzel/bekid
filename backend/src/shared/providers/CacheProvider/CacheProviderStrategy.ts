import { container } from 'tsyringe';
import { ICacheProvider } from './models/ICacheProvider';
import { RedisCacheProvider } from './services/RedisCacheProvider';

class CacheProviderStrategy {
    private _strategies: any = {};

    constructor() {
        this._strategies['redis'] = () => RedisCacheProvider;
    }

    public setStrategy(service: string): void {
        const existsStrategy = this._strategies.hasOwnProperty(service);

        if (!existsStrategy) {
            throw new Error('Service provider not found in strategies!');
        }

        container.registerSingleton<ICacheProvider>('CacheProvider', this._strategies[service]());
    }
}

export { CacheProviderStrategy };
