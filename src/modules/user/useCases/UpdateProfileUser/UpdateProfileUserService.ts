import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IProfileUpdateUserDTO } from '../../dtos/IUpdateProfileUserDTO';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';
import { IHashProvider } from '@modules/user/providers/HashProvider/models/IHashProvider';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class UpdateProfileUserService {
    constructor(
        @inject('UserRepository') private _userRepository: IUserRepository,
        @inject('HashProvider') private _hashProvider: IHashProvider
    ) {}

    public async execute(userId: string, data: IProfileUpdateUserDTO): Promise<IUserEntity> {
        const { name, email, current_password } = data;

        /* Find user by id */

        const existsUserWithId = await this._userRepository.findOneById(userId);

        /* Exception estrategy guard */

        if (!existsUserWithId) {
            throw new AppException('User not exists!', 404);
        }

        /* Find user by email */

        const existsUserWithEmail = await this._userRepository.findOneByEmail(email);

        /* Exception estrategy guard */

        if (email !== existsUserWithId.email && existsUserWithEmail) {
            throw new AppException('User email already exists!', 400);
        }

        /* Extract password */

        const { password } = existsUserWithId;

        /* Check if password is equals */

        const isPasswordEquals: boolean = await this._hashProvider.compareHash(current_password, password);

        /* Exception estrategy guard */

        if (!isPasswordEquals) {
            throw new AppException('Password not equals!', 400);
        }

        /* Data update */

        existsUserWithId.name = name;

        existsUserWithId.email = email;

        /* Save user in repository */

        const savedUser = await this._userRepository.save(existsUserWithId);

        /* Return saved user */

        return savedUser;
    }
}

export { UpdateProfileUserService };
