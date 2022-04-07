import { injectable, inject } from 'tsyringe';

import { IUserEntity } from '@modules/user/models/entities/IUserEntity';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class ShowUserService {
    constructor(@inject('UserRepository') private _userRepository: IUserRepository) {}

    public async execute(userId: string): Promise<IUserEntity> {
        /* Find user by id */

        const existsUser = await this._userRepository.findOneById(userId);

        /* Strategy guard */

        if (!existsUser) {
            throw new AppException(`User id ${userId} not found!`, 404);
        }

        /* Retur user */

        return existsUser;
    }
}

export { ShowUserService };
