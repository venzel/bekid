import { container } from 'tsyringe';
import { IQueueProvider } from './models/IQueueProvider';
import { BullQueueProvider } from './services/BullQueueProvider';

class QueueProviderStrategy {
    private _strategies: any = {};

    constructor() {
        this._strategies['bull'] = () => BullQueueProvider;
    }

    public setStrategy(service: string): void {
        const existsStrategy = this._strategies.hasOwnProperty(service);

        if (!existsStrategy) {
            throw new Error('Service provider not found in strategies!');
        }

        container.registerSingleton<IQueueProvider>('QueueProvider', this._strategies[service]());
    }
}

export { QueueProviderStrategy };
