import { injectable, inject, container } from 'tsyringe';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { ICacheProvider } from '@shared/providers/CacheProvider/models/ICacheProvider';
import { ICreateUserDTO } from '@modules/user/useCases/CreateUser/ICreateUserDTO';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';
import { CreateUserService } from './CreateUserService';
import { environment } from '@configs/geral';

@injectable()
class CreateUserServiceProxy {
    constructor(
        @inject('UserRepository') private _userRepository: IUserRepository,
        @inject('CacheProvider') private _cacheProvider: ICacheProvider
    ) {}

    public async execute(data: ICreateUserDTO): Promise<IUserEntity> {
        const { name, email, password } = data;

        /* Vars multable */

        let role = 'USER';

        let activated = false;

        /* Vars of cache */

        const authKeyCache = 'exists_user';

        const timeToExpiresCache = environment === 'development' ? 30 : 3000;

        /* Init cache */

        const existsKeyInCache = await this._cacheProvider.findByKey(authKeyCache);

        if (!existsKeyInCache) {
            const countUsers = await this._userRepository.count();

            if (!countUsers) {
                role = 'ADMIN';
                activated = true;
            }
        }

        if (environment === 'development') {
            activated = true;
        }

        /* Service intercepted */

        const creteUserService = container.resolve(CreateUserService);

        const createdUser = await creteUserService.execute({ name, email, password, activated, role });

        /* Save cache */

        await this._cacheProvider.save(authKeyCache, JSON.stringify(true), timeToExpiresCache);

        /* Return created user */

        return createdUser;
    }
}

export { CreateUserServiceProxy };
