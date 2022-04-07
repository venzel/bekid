import { injectable, inject } from 'tsyringe';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';

@injectable()
class ListUserService {
    constructor(@inject('UserRepository') private _userRepository: IUserRepository) {}

    public async execute(): Promise<IUserEntity[]> {
        return await this._userRepository.list();
    }
}

export { ListUserService };
