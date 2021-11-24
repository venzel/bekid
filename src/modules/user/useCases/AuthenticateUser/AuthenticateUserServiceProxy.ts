import { injectable, inject, container } from 'tsyringe';
import { IHashProvider } from '@modules/user/providers/HashProvider/models/IHashProvider';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';
import { IAuthenticateUserDTO } from '../../dtos/IAuthenticateUserDTO';
import { ICacheProvider } from '@shared/providers/CacheProvider/models/ICacheProvider';
import { AuthenticateUserService } from './AuthenticateUserService';
import { AppException } from '@shared/exceptions/AppException';
import { UserPostgresEntity } from '@modules/user/infra/typeorm/postgres/entities/UserPostgresEntity';

@injectable()
class AuthenticateUserServiceProxy {
    constructor(@inject('CacheProvider') private _cacheProvider: ICacheProvider, @inject('HashProvider') private _hashProvider: IHashProvider) {}

    public async execute(data: IAuthenticateUserDTO): Promise<IUserEntity> {
        const { email, password } = data;

        /* Vars of cache */

        const authKeyCache = `authenticate:${email}`;

        const timeToExpiresCache = 120;

        /* Init cache */

        const existsKeyInCache = await this._cacheProvider.findByKey(authKeyCache);

        /* Exception estrategy guard */

        if (!existsKeyInCache) {
            const authenticateUserService = container.resolve(AuthenticateUserService);

            const createdUser = await authenticateUserService.execute({ email, password });

            await this._cacheProvider.save(authKeyCache, JSON.stringify(createdUser), timeToExpiresCache);

            return createdUser;
        }

        const dataParseToJSON = JSON.parse(existsKeyInCache);

        const { password: cache_password } = JSON.parse(existsKeyInCache);

        /* Compare password and cache_password */

        const isPasswordEquals: boolean = await this._hashProvider.compareHash(password, cache_password);

        /* Exception estrategy guard */

        if (!isPasswordEquals) {
            throw new AppException('Email or password invalid!', 403);
        }

        /* Create user */

        const user = new UserPostgresEntity();

        /* End generate token by provider */

        Object.assign(user, dataParseToJSON);

        /* Updata data cache */

        await this._cacheProvider.save(authKeyCache, JSON.stringify(dataParseToJSON), timeToExpiresCache);

        /* Return user */

        return user;
    }
}

export { AuthenticateUserServiceProxy };
