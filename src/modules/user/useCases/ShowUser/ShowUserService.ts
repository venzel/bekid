import { injectable, inject } from 'tsyringe';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IShowUserDTO } from './IShowUserDTO';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class ShowUserService {
    constructor(@inject('UserRepository') private _userRepository: IUserRepository) {}

    public async execute(data: IShowUserDTO): Promise<IUserEntity> {
        const { user_params_id, owner_id, role } = data;

        const existsUser = await this._userRepository.findOneById(user_params_id);

        if (!existsUser) {
            throw new AppException('User not found!', 404);
        }

        if (role === 'USER' && existsUser.id !== owner_id) {
            throw new AppException('It is not possible to show data another user!', 403);
        }

        return existsUser;
    }
}

export { ShowUserService };
