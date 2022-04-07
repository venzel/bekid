import { injectable, inject, container } from 'tsyringe';

import { IHashProvider } from '@modules/user/providers/HashProvider/models/IHashProvider';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';
import { IAuthenticateUserDTO } from '../../dtos/IAuthenticateUserDTO';
import { ICacheProvider } from '@shared/providers/CacheProvider/models/ICacheProvider';
import { AuthenticateUserService } from './AuthenticateUserService';
import { AppException } from '@shared/exceptions/AppException';
import { UserPostgresEntity } from '@modules/user/infra/typeorm/postgres/entities/UserPostgresEntity';
import { token_cache_expires } from '@configs/token';

@injectable()
class AuthenticateUserServiceProxy {
    constructor(@inject('CacheProvider') private _cacheProvider: ICacheProvider, @inject('HashProvider') private _hashProvider: IHashProvider) {}

    public async execute(data: IAuthenticateUserDTO): Promise<IUserEntity> {
        /* Destructuring object */

        const { email, password } = data;

        /* Vars of cache */

        const authKeyCache = `authenticate:${email}`;

        /* Find cache by key */

        const existsKeyInCache = await this._cacheProvider.findByKey(authKeyCache);

        /* Strategy guard */

        if (!existsKeyInCache) {
            const authenticateUserService = container.resolve(AuthenticateUserService);

            const authenticateUser = await authenticateUserService.execute({ email, password });

            await this._cacheProvider.save(authKeyCache, JSON.stringify(authenticateUser), token_cache_expires);

            return authenticateUser;
        }

        /* Data parse to JSON */

        const dataParseToJSON = JSON.parse(existsKeyInCache);

        /* Compare password and cache_password */

        const isPasswordEquals: boolean = await this._hashProvider.compareHash(password, dataParseToJSON.password);

        /* Strategy guard */

        if (!isPasswordEquals) {
            throw new AppException('Email or password invalid!', 403);
        }

        /* Create user */

        const user = new UserPostgresEntity();

        /* Mofify object user */

        Object.assign(user, dataParseToJSON);

        /* Updata data cache */

        await this._cacheProvider.save(authKeyCache, JSON.stringify(dataParseToJSON), token_cache_expires);

        /* Return user */

        return user;
    }
}

export { AuthenticateUserServiceProxy };
