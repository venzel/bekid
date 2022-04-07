import { IStorageProvider } from '../models/IStorageProvider'

class FakeStorageProvider implements IStorageProvider {
    public async saveFile(file: string): Promise<string> {
        throw new Error('Method not implemented.')
    }

    public async deleteFile(file: string): Promise<void> {
        throw new Error('Method not implemented.')
    }
}

export { FakeStorageProvider }
