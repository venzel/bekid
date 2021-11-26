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

        /* Exception estrategy guard */

        if (!existsUser) {
            throw new AppException('User does not exists!', 404);
        }

        /* Destructuring object */

        const { id, password } = existsUser;

        /* Generate token by provider */

        const generatedToken: string = await this._hashProvider.gererateHash(password);

        /* End generate token by provider */

        const createdToken: string = await this._userTokenRepository.create({ token: generatedToken, user_id: id });

        /* Return created token */

        return createdToken;
    }
}

export { ForgotPasswordUserService };
