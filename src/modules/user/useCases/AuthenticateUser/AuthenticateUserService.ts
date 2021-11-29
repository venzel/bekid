import { injectable, inject } from 'tsyringe';

import { IHashProvider } from '@modules/user/providers/HashProvider/models/IHashProvider';
import { ITokenProvider } from '@modules/user/providers/TokenProvider/models/ITokenProvider';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';
import { IAuthenticateUserDTO } from '../../dtos/IAuthenticateUserDTO';
import { AppException } from '@shared/exceptions/AppException';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UserRepository') private _userRepository: IUserRepository,
        @inject('TokenProvider') private _tokenProvider: ITokenProvider,
        @inject('HashProvider') private _hashProvider: IHashProvider
    ) {}

    public async execute(data: IAuthenticateUserDTO): Promise<IUserEntity> {
        const { email, password } = data;

        /* Find user by email */

        const existsUser = await this._userRepository.findOneByEmail(email);

        /* Exception estrategy guard */

        if (!existsUser) {
            throw new AppException('Email or password invalid!', 403);
        }

        /* Destructuring object */

        const { id: user_id, role: roleAlias, activated, allowed, password: data_password } = existsUser;

        /* Convert to IsRoleDTO */

        const role = roleAlias as IRoleDTO;

        /* Exception estrategy guard */

        if (!allowed) {
            throw new AppException('User not allowed!', 403);
        }

        /* Check if password is equals */

        const isPasswordEquals = await this._hashProvider.compareHash(password, data_password);

        /* Exception estrategy guard */

        if (!isPasswordEquals) {
            throw new AppException('Email or password invalid!', 403);
        }

        /* Generate token by provider */

        const token = await this._tokenProvider.generateToken({ user_id, role, activated });

        /* End generate token by provider */

        Object.assign(existsUser, { token });

        /* Return user */

        return existsUser;
    }
}

export { AuthenticateUserService };
