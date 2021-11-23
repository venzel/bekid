import { injectable, inject } from 'tsyringe';
import { IHashProvider } from '@modules/user/providers/HashProvider/models/IHashProvider';
import { ITokenProvider } from '@modules/user/providers/TokenProvider/models/ITokenProvider';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';
import { IAuthenticateUserDTO } from './IAuthenticateUserDTO';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UserRepository') private _userRepository: IUserRepository,
        @inject('TokenProvider') private _tokenProvider: ITokenProvider,
        @inject('HashProvider') private _hashProvider: IHashProvider
    ) {}

    public async execute(data: IAuthenticateUserDTO): Promise<IUserEntity> {
        const { email, password } = data;

        const existsUser = await this._userRepository.findOneByEmail(email);

        if (!existsUser) {
            throw new AppException('Email or password invalid!', 403);
        }

        const { id: data_id, role, activated, allowed, password: data_password } = existsUser;

        if (!allowed) {
            throw new AppException('User not allowed!', 403);
        }

        const isPasswordEquals: boolean = await this._hashProvider.compareHash(password, data_password);

        if (!isPasswordEquals) {
            throw new AppException('Email or password invalid!', 403);
        }

        /* Generate token by provider */

        const generatedToken: string = await this._tokenProvider.generateToken({
            owner_id: data_id,
            role,
            activated,
        });

        /* End generate token by provider */

        Object.assign(existsUser, { token: generatedToken });

        /* Return user */

        return existsUser;
    }
}

export { AuthenticateUserService };
