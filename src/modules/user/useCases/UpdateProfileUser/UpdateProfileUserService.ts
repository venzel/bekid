import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IProfileUpdateUserDTO } from './IUpdateProfileUserDTO';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';
import { IHashProvider } from '@modules/user/providers/HashProvider/models/IHashProvider';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class UpdateProfileUserService {
    constructor(
        @inject('UserRepository') private _userRepository: IUserRepository,
        @inject('HashProvider') private _hashProvider: IHashProvider
    ) {}

    public async execute(data: IProfileUpdateUserDTO): Promise<IUserEntity> {
        const { name, email, current_password, owner_id } = data;

        const existsUserWithEmail = await this._userRepository.findOneByEmail(email);

        if (existsUserWithEmail && existsUserWithEmail.id !== owner_id) {
            throw new AppException('User email already exists!', 400);
        }

        const existsUserWithId = await this._userRepository.findOneById(owner_id);

        if (!existsUserWithId) {
            throw new AppException('User not exists!', 404);
        }

        const userDataPassword = existsUserWithId.password;

        const isPasswordEquals: boolean = await this._hashProvider.compareHash(current_password, userDataPassword);

        if (!isPasswordEquals) {
            throw new AppException('Password not equals!', 400);
        }

        /* Data update */

        existsUserWithId.name = name;
        existsUserWithId.email = email;

        /* End data update */

        const savedUser = await this._userRepository.save(existsUserWithId);

        return savedUser;
    }
}

export { UpdateProfileUserService };
