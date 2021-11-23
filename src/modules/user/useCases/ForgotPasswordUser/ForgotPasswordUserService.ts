import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IUserTokenRepository } from '@modules/user/repositories/IUserTokenRepository';
import { IGenerateIdProvider } from '@shared/providers/generateIdProvider/model/IGenerateIdProvider';
import { IQueueProvider } from '@shared/providers/QueueProvider/models/IQueueProvider';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class ForgotPasswordUserService {
    constructor(
        @inject('UserRepository') private _userRepository: IUserRepository,
        @inject('UserTokenRepository') private _userTokenRepository: IUserTokenRepository,
        @inject('GenerateIdProvider') private _generateIdProvider: IGenerateIdProvider,
        @inject('QueueProvider') private _queueProvider: IQueueProvider
    ) {}

    public async execute(email: string): Promise<string> {
        const existsUser = await this._userRepository.findOneByEmail(email);

        if (!existsUser) {
            throw new AppException('User does not exists!', 404);
        }

        /* Generate token by provider */

        const generatedToken: string = this._generateIdProvider.generateId();

        /* End generate token by provider */

        const createdToken: string = await this._userTokenRepository.create({
            token: generatedToken,
            owner_id: existsUser.id,
        });

        return createdToken;
    }
}

export { ForgotPasswordUserService };
