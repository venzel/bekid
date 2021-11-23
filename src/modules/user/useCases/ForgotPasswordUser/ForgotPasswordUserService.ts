import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IUserTokenRepository } from '@modules/user/repositories/IUserTokenRepository';
import { IGenerateIdProvider } from '@shared/providers/generateIdProvider/model/IGenerateIdProvider';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class ForgotPasswordUserService {
    constructor(
        @inject('UserRepository') private _userRepository: IUserRepository,
        @inject('UserTokenRepository') private _userTokenRepository: IUserTokenRepository,
        @inject('GenerateIdProvider') private _generateIdProvider: IGenerateIdProvider
    ) {}

    public async execute(email: string): Promise<string> {
        /* Find user by email */

        const existsUser = await this._userRepository.findOneByEmail(email);

        /* Exception estrategy guard */

        if (!existsUser) {
            throw new AppException('User does not exists!', 404);
        }

        /* Generate token by provider */

        const generatedToken: string = this._generateIdProvider.generateId();

        /* End generate token by provider */

        const createdToken: string = await this._userTokenRepository.create({
            token: generatedToken,
            user_id: existsUser.id,
        });

        /* Return created token */

        return createdToken;
    }
}

export { ForgotPasswordUserService };
