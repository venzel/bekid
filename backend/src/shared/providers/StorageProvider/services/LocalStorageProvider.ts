import fs from 'fs';
import { resolve } from 'path';
import { IStorageProvider } from '../models/IStorageProvider';
import { uploads_folder, avatars_folder } from '../../../../configs/storage';

class LocalStorageProvider implements IStorageProvider {
    public async saveFile(file: string): Promise<string> {
        await fs.promises.rename(resolve(uploads_folder, file), resolve(avatars_folder, file));

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        const filePath = resolve(avatars_folder, file);

        try {
            await fs.promises.stat(filePath);
        } catch {
            return;
        }

        await fs.promises.unlink(filePath);
    }
}

export { LocalStorageProvider };
