import { injectable, inject } from 'tsyringe';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class ToggleRoleUserService {
    constructor(@inject('UserRepository') private _userRepository: IUserRepository) {}

    public async execute(userId: string): Promise<IUserEntity> {
        /* Find user by id */

        const existsUser = await this._userRepository.findOneById(userId);

        /* Strategy guard */

        if (!existsUser) {
            throw new AppException(`User id ${userId} not exists!`, 404);
        }

        /* Apply effective toggle */

        const toggleRole = existsUser.role === 'ADMIN' ? 'USER' : 'ADMIN';

        /* Data update */

        existsUser.role = toggleRole;

        /* End data update */

        const userSaved = await this._userRepository.save(existsUser);

        /* Return user saved */

        return userSaved;
    }
}

export { ToggleRoleUserService };
