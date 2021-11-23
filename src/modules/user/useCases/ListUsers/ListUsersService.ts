import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IListUsersDTO } from './IListUsersDTO';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';

@injectable()
class ListUsersService {
    constructor(@inject('UserRepository') private _userRepository: IUserRepository) {}

    public async execute(data: IListUsersDTO): Promise<IUserEntity[]> {
        const { query_count, owner_id } = data;

        const users = await this._userRepository.list();

        return users;
    }
}

export { ListUsersService };
