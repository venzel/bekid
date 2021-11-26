import { v4 as uuid } from 'uuid';
import { IGenerateIdProvider } from '../model/IGenerateIdProvider';

class HashGenerateIdProvider implements IGenerateIdProvider {
    public generateId(): string {
        return uuid().split('-')[0];
    }
}

export { HashGenerateIdProvider };
