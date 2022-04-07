import { injectable, inject } from 'tsyringe';

import { IHashProvider } from '@modules/user/providers/HashProvider/models/IHashProvider';
import { ITokenProvider } from '@modules/user/providers/TokenProvider/models/ITokenProvider';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';
import { IRegisterUserDTO } from '@modules/user/dtos/IRegisterUserDTO';
import { AppException } from '@shared/exceptions/AppException';
import { environment } from '@configs/geral';
import { generateSlugs } from '@modules/user/helpers/generateNameSlug';

@injectable()
class RegisterUserService {
    constructor(
        @inject('UserRepository') private _userRepository: IUserRepository,
        @inject('HashProvider') private _hashProvider: IHashProvider,
        @inject('TokenProvider') private _tokenProvider: ITokenProvider
    ) {}

    public async execute(data: IRegisterUserDTO): Promise<IUserEntity> {
        /* Destructuring object */

        const { name, email, password, role } = data;

        /* Find user by email */

        const existsUser = await this._userRepository.findOneByEmail(email);

        /* Strategy guard */

        if (existsUser) {
            throw new AppException(`User email ${email} already exists!`, 400);
        }

        /* Count users in repository */

        const count = await this._userRepository.count();

        /* Generate hash password by provider */

        const hashPassword = await this._hashProvider.gererateHash(password);

        /* Multables variables */

        let activated = false,
            allowed = false,
            avatar = '';

        /* Generate slug */

        const slug = generateSlugs(name);

        /* Object construct user */

        const user = {
            name,
            email,
            password: hashPassword,
            role,
            avatar,
            slug,
            activated,
            allowed,
        };

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

        /* User created in repository */

        const userRegisterd = await this._userRepository.create(user);

        /* Payload generated */

        const payload = {
            user_id: userRegisterd.id,
            role: user.role,
            activated,
        };

        /* Token generated */

        const token = await this._tokenProvider.generateToken(payload);

        /* User object assign */

        Object.assign(userRegisterd, { token });

        /* Return user created */

        return userRegisterd;
    }
}

export { RegisterUserService };
