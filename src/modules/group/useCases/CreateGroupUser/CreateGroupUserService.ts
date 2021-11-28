import { injectable, inject } from 'tsyringe';

import { IGroupEntity } from '@modules/group/models/entities/IGroupEntity';
import { IGroupRepository } from '@modules/group/repositories/IGroupRepository';
import { ICreateGroupUserDTO } from '@modules/group/dtos/ICreateGroupUserDTO';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppException } from '@shared/exceptions/AppException';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';

@injectable()
class CreateGroupUserService {
    constructor(
        @inject('GroupRepository') private _groupRepository: IGroupRepository,
        @inject('UserRepository') private _userRepository: IUserRepository
    ) {}

    public async execute(data: ICreateGroupUserDTO): Promise<IGroupEntity> {
        const { group_id, users_ids } = data;

        /* Find group by id */

        const existsGroup = await this._groupRepository.findOneById(group_id);

        /* Exception estrategy guard */

        if (!existsGroup) {
            throw new AppException(`Grpup id ${group_id} not exists!`, 404);
        }

        /* Find group by id */

        const existsUsers: IUserEntity[] = await this._userRepository.findAllByIds(users_ids);

        /* Exception estrategy guard */

        if (!existsUsers) {
            const payload = { ids: users_ids };

            throw new AppException(`Users not exists!`, 404, payload);
        }

        /* Set users in group */

        existsGroup.users = existsUsers;

        /* Save group */

        const savedGroup = await this._groupRepository.save(existsGroup);

        /* Return the group saved */

        return savedGroup;
    }
}

export { CreateGroupUserService };
