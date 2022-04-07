import { injectable, inject } from 'tsyringe';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';
import { AppException } from '@shared/exceptions/AppException';
import { IFindAllUsersContainNameDTO } from '@modules/user/dtos/IFindAllUsersContainName';

@injectable()
class FindAllUsersContainNameService {
    constructor(@inject('UserRepository') private _userRepository: IUserRepository) {}

    public async execute(data: IFindAllUsersContainNameDTO): Promise<IUserEntity[]> {
        /* Destructuring object */

        const { name } = data;

        /* Find user by email */

        const existsUser = await this._userRepository.findAllContainsName(name);

        /* Strategy guard */

        if (!existsUser) {
            throw new AppException(`User ${name} not found!`, 404);
        }

        /* Return user */

        return existsUser;
    }
}

export { FindAllUsersContainNameService };
