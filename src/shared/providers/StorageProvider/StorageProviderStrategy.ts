import { container } from 'tsyringe'
import { IStorageProvider } from './models/IStorageProvider'
import { LocalStorageProvider } from './services/LocalStorageProvider'

class StorageProviderStrategy {
    private _strategies: any = {}

    constructor() {
        this._strategies['local'] = () => LocalStorageProvider
    }

    public setStrategy(service: string): void {
        const existsStrategy = this._strategies.hasOwnProperty(service)

        if (!existsStrategy) throw new Error('Service provider not found in strategies!')

        container.registerSingleton<IStorageProvider>('StorageProvider', this._strategies[service]())
    }
}

export { StorageProviderStrategy }
