import { injectable, inject } from 'tsyringe';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class DeleteUserService {
    constructor(@inject('UserRepository') private _userRepository: IUserRepository) {}

    public async execute(userId: string): Promise<IUserEntity> {
        /* Find user by id */

        const existsUser = await this._userRepository.findOneById(userId);

        /* Strategy guard */

        if (!existsUser) {
            throw new AppException(`User id ${userId} not found!`, 404);
        }

        /* Delete object in repository */

        const userDeleted = await this._userRepository.delete(existsUser);

        /* Set group id in object */

        existsUser.id = userId;

        /* Return user deleted */

        return userDeleted;
    }
}

export { DeleteUserService };
