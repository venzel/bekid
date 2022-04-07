import { container } from 'tsyringe';
import { IMailProvider } from './models/IMailProvider';
import { MailTrapMailProvider } from './services/MailTrapMailProvider';

class MailProviderStrategy {
    private _strategies: any = {};

    constructor() {
        this._strategies['mailtrap'] = () => MailTrapMailProvider;
    }

    public setStrategy(service: string): void {
        const existsStrategy = this._strategies.hasOwnProperty(service);

        if (!existsStrategy) {
            throw new Error('Service provider not found in strategies!');
        }

        container.registerSingleton<IMailProvider>('MailProvider', this._strategies[service]());
    }
}

export { MailProviderStrategy };
