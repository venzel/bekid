import { v4 as uuid } from 'uuid';
import { IGenerateIdProvider } from '../model/IGenerateIdProvider';

class UUIDGenerateIdProvider implements IGenerateIdProvider {
    public generateId(): string {
        return uuid();
    }
}

export { UUIDGenerateIdProvider };
