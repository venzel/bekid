import multer, { StorageEngine, Options } from 'multer';
import { Request } from 'express';
import { resolve } from 'path';
import { randomBytes } from 'crypto';
import { extname } from 'path';
import { AppException } from '@shared/exceptions/AppException';

interface IStorageConfigDTO {
    uploads_folder: string;
    avatars_folder: string;
}

const _tmpPath = (): string => {
    return resolve(__dirname, '..', '..', 'tmp');
};

const _uploadsPath = (): string => {
    return resolve(_tmpPath(), 'uploads');
};

const _avatarsPath = (): string => {
    return resolve(_tmpPath(), 'uploads', 'avatars');
};

const _storage = (): StorageEngine => {
    return multer.diskStorage({
        destination: _uploadsPath(),
        filename(_req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
            const fileHash = randomBytes(5).toString('hex');

            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    });
};

const _fileFilter = (): any => {
    return (_req: Request, file: Express.Multer.File, callback: (error: AppException | null, acceptFile: boolean) => void) => {
        const extensions: string[] = ['.png', '.jpg', '.gif', '.jpeg'];

        const extensionFile: string = extname(file.originalname);

        if (!extensions.includes(extensionFile)) return callback(new AppException('Only images are allowed!'), false);

        callback(null, true);
    };
};

const paths: IStorageConfigDTO = {
    uploads_folder: _uploadsPath(),
    avatars_folder: _avatarsPath(),
};

const options: Options = {
    storage: _storage(),
    fileFilter: _fileFilter(),
};

const { uploads_folder, avatars_folder } = paths;

export default options;
export { uploads_folder };
export { avatars_folder };
