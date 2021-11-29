import { injectable, inject } from 'tsyringe';

import { IHashProvider } from '@modules/user/providers/HashProvider/models/IHashProvider';
import { ITokenProvider } from '@modules/user/providers/TokenProvider/models/ITokenProvider';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';
import { ICreatePayloadDTO } from '@modules/user/dtos/ICreatePayloadDTO';
import { AppException } from '@shared/exceptions/AppException';
import { environment } from '@configs/geral';

@injectable()
class CreateUserService {
    constructor(
        @inject('UserRepository') private _userRepository: IUserRepository,
        @inject('HashProvider') private _hashProvider: IHashProvider,
        @inject('TokenProvider') private _tokenProvider: ITokenProvider
    ) {}

    public async execute(data: ICreateUserDTO): Promise<IUserEntity> {
        const { name, email, password: passwordAlias, role } = data;

        /* Find user by email */

        const existsUser = await this._userRepository.findOneByEmail(email);

        /* Exception estrategy guard */

        if (existsUser) {
            throw new AppException(`User email ${email} already exists!`, 400);
        }

        /* Count users in repository */

        const count = await this._userRepository.count();

        /* Generate hash password by provider */

        const password = await this._hashProvider.gererateHash(passwordAlias);

        /* Multables variables */

        let activated = false,
            allowed = false,
            avatar = '';

        /* Object construct user */

        const user = { name, email, password, role, avatar, activated, allowed };

        /* If repository is empty */

        if (!count) {
            user.role = 'ADMIN';

            activated = user.activated = true;

            allowed = user.allowed = true;
        }

        /* If user repository is not empty and ambient is development */

        if (count && environment === 'development') {
            activated = user.activated = true;

            allowed = user.allowed = true;
        }

        /* User created */

        const userCreated = await this._userRepository.create(user);

        /* Payload generated */

        const payload: ICreatePayloadDTO = {
            user_id: userCreated.id,
            role: user.role,
            activated,
        };

        /* Token generated */

        const token = await this._tokenProvider.generateToken(payload);

        /* User object assign */

        Object.assign(userCreated, { token });

        /* Return user created */

        return userCreated;
    }
}

export { CreateUserService };
