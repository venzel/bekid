import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class ToggleAllowUserService {
    constructor(@inject('UserRepository') private _userRepository: IUserRepository) {}

    public async execute(userId: string): Promise<IUserEntity> {
        /* Find user by id */

        const existsUser = await this._userRepository.findOneById(userId);

        /* Exception estrategy guard */

        if (!existsUser) {
            throw new AppException('User not exists!', 404);
        }

        /* Apply effective toggle */

        const toggleAllow = existsUser.allowed === true ? false : true;

        /* Data update */

        existsUser.allowed = toggleAllow;

        /* End data update */

        const savedUser = await this._userRepository.save(existsUser);

        /* Return saved user */

        return savedUser;
    }
}

export { ToggleAllowUserService };
