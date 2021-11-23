import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class ToggleRoleUserService {
    constructor(@inject('UserRepository') private _userRepository: IUserRepository) {}

    public async execute(user_params_id: string): Promise<IUserEntity> {
        const existsUser = await this._userRepository.findOneById(user_params_id);

        if (!existsUser) {
            throw new AppException('User not exists!', 404);
        }

        const toggleRole = existsUser.role === 'ADMIN' ? 'USER' : 'ADMIN';

        /* Data update */

        existsUser.role = toggleRole;

        /* End data update */

        const savedUser = await this._userRepository.save(existsUser);

        return savedUser;
    }
}

export { ToggleRoleUserService };
