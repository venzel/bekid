import { IHashProvider } from '../models/IHashProvider';

class HashProviderInMemory implements IHashProvider {
    public async gererateHash(payload: string): Promise<string> {
        return payload;
    }

    public async compareHash(payload: string, hashed: string): Promise<boolean> {
        return payload === hashed;
    }
}

export { HashProviderInMemory };
