import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';
import { IDeleteUserDTO } from './IDeleteUserDTO';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class DeleteUserService {
    constructor(@inject('UserRepository') private _userRepository: IUserRepository) {}

    public async execute(data: IDeleteUserDTO): Promise<IUserEntity> {
        const { user_params_id } = data;

        const existsUser = await this._userRepository.findOneById(user_params_id);

        if (!existsUser) {
            throw new AppException('User not found!', 404);
        }

        const deletedUser = await this._userRepository.delete(existsUser);

        return deletedUser;
    }
}

export { DeleteUserService };
