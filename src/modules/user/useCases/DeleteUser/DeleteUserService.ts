import { injectable, inject } from 'tsyringe';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class DeleteUserService {
    constructor(@inject('UserRepository') private _userRepository: IUserRepository) {}

    public async execute(userId: string): Promise<IUserEntity> {
        const existsUser = await this._userRepository.findOneById(userId);

        if (!existsUser) {
            throw new AppException(`User id ${userId} not found!`, 404);
        }

        const deletedUser = await this._userRepository.delete(existsUser);

        /* Set group id in object */

        existsUser.id = userId;

        return deletedUser;
    }
}

export { DeleteUserService };
