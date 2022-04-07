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

    public async execute(data: IProfileUpdateUserDTO): Promise<IUserEntity> {
        /* Destructuring object */

        const { user_token_id, name, email, current_password } = data;

        /* Find user by id */

        const existsUser = await this._userRepository.findOneById(user_token_id);

        /* Strategy guard */

        if (!existsUser) {
            throw new AppException(`User not exists!`, 404);
        }

        /* Find user by email */

        const existsUserWithEmail = await this._userRepository.findOneByEmail(email);

        /* Strategy guard */

        if (email !== existsUser.email && existsUserWithEmail) {
            throw new AppException(`User email ${email} already exists!`, 400);
        }

        /* Extract password */

        const { password } = existsUser;

        /* Check if password is equals */

        const isPasswordEquals: boolean = await this._hashProvider.compareHash(current_password, password);

        /* Strategy guard */

        if (!isPasswordEquals) {
            throw new AppException('Password not equals!', 400);
        }

        /* Data update */

        existsUser.name = name;

        existsUser.email = email;

        /* Save user in repository */

        const userSaved = await this._userRepository.save(existsUser);

        /* Return user saved */

        return userSaved;
    }
}

export { UpdateProfileUserService };
