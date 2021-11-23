import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IUserTokenRepository } from '@modules/user/repositories/IUserTokenRepository';
import { IHashProvider } from '@modules/user/providers/HashProvider/models/IHashProvider';
import { IResetPasswordUserDTO } from './IResetPasswordUserDTO';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class ResetPasswordUserService {
    constructor(
        @inject('UserRepository') private _userRepository: IUserRepository,
        @inject('UserTokenRepository') private _userTokenRepository: IUserTokenRepository,
        @inject('HashProvider') private _hashProvider: IHashProvider
    ) {}

    public async execute(data: IResetPasswordUserDTO): Promise<void> {
        const { new_password, token } = data;

        const existsUserWithToken = await this._userTokenRepository.findOneByToken(token);

        if (!existsUserWithToken) {
            throw new AppException('User token does not exists!', 404);
        }

        /* Var owner_id used in two locals */

        const { owner_id } = existsUserWithToken;

        const existsUserWithId = await this._userRepository.findOneById(owner_id);

        if (!existsUserWithId) {
            throw new AppException('User does not exists!', 404);
        }

        /* Generate hash password by provider */

        const generatedHashPassword: string = await this._hashProvider.gererateHash(new_password);

        /* Updated user data */

        existsUserWithId.password = generatedHashPassword;

        /* Delete all tokens */

        await this._userTokenRepository.deleteTokensByOwnerId(owner_id);
    }
}

export { ResetPasswordUserService };
