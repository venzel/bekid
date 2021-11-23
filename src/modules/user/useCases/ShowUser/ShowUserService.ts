import { injectable, inject } from 'tsyringe';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class ShowUserService {
    constructor(@inject('UserRepository') private _userRepository: IUserRepository) {}

    public async execute(userId: string): Promise<IUserEntity> {
        const existsUser = await this._userRepository.findOneById(userId);

        if (!existsUser) {
            throw new AppException('User not found!', 404);
        }

        return existsUser;
    }
}

export { ShowUserService };
