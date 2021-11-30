import { injectable, inject } from 'tsyringe';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IUserTokenRepository } from '@modules/user/repositories/IUserTokenRepository';
import { IHashProvider } from '@modules/user/providers/HashProvider/models/IHashProvider';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class ForgotPasswordUserService {
    constructor(
        @inject('UserRepository') private _userRepository: IUserRepository,
        @inject('UserTokenRepository') private _userTokenRepository: IUserTokenRepository,
        @inject('HashProvider') private _hashProvider: IHashProvider
    ) {}

    public async execute(email: string): Promise<string> {
        /* Find user by email */

        const existsUser = await this._userRepository.findOneByEmail(email);

        /* Strategy guard */

        if (!existsUser) {
            throw new AppException(`User ${email} does not exists!`, 404);
        }

        /* Destructuring object */

        const { id: user_id, password } = existsUser;

        /* Generate token by provider */

        const token = await this._hashProvider.gererateHash(password);

        /* End generate token by provider */

        const tokenCreated = await this._userTokenRepository.create({ token, user_id });

        /* Return token created */

        return tokenCreated;
    }
}

export { ForgotPasswordUserService };
