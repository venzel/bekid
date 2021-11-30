import { injectable, inject } from 'tsyringe';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IStorageProvider } from '@shared/providers/StorageProvider/models/IStorageProvider';
import { IUpdateAvatarUserDTO } from '../../dtos/IUpdateAvatarUserDTO';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class UpdateAvatarUserService {
    constructor(
        @inject('UserRepository') private _userRepository: IUserRepository,
        @inject('StorageProvider') private _storageProvider: IStorageProvider
    ) {}

    public async execute(data: IUpdateAvatarUserDTO): Promise<IUserEntity> {
        const { filename, user_id } = data;

        /* Find user by id */

        const existsUser = await this._userRepository.findOneById(user_id);

        /* Strategy guard */

        if (!existsUser) {
            throw new AppException(`User id ${user_id} not exists!`, 404);
        }

        /* Destructuring object */

        const { avatar } = existsUser;

        /* If exists avatar, delete file */

        if (avatar) {
            await this._storageProvider.deleteFile(avatar);
        }

        /* Save file */

        const nameFileSaved: string = await this._storageProvider.saveFile(filename);

        /* Update data */

        existsUser.avatar = nameFileSaved;

        /* End update data */

        const savedUser = await this._userRepository.save(existsUser);

        /* Return saved user */

        return savedUser;
    }
}

export { UpdateAvatarUserService };
