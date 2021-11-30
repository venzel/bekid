import { injectable, inject } from 'tsyringe';

import { ISaveGroupUserDTO } from '@modules/group/dtos/ISaveGroupUserDTO';
import { IGroupEntity } from '@modules/group/models/entities/IGroupEntity';
import { IGroupRepository } from '@modules/group/repositories/IGroupRepository';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppException } from '@shared/exceptions/AppException';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';

@injectable()
class SaveGroupUserService {
    constructor(
        @inject('GroupRepository') private _groupRepository: IGroupRepository,
        @inject('UserRepository') private _userRepository: IUserRepository
    ) {}

    public async execute(managerId: string, role: string, data: ISaveGroupUserDTO): Promise<IGroupEntity> {
        const { group_id, users_ids } = data;

        /* Find group by id */

        const existsGroup = await this._groupRepository.findOneById(group_id);

        /* Exception estrategy guard */

        if (!existsGroup) {
            throw new AppException(`Grpup id ${group_id} not exists!`, 404);
        }

        /* The group manager arrives */

        if (existsGroup.user_id !== managerId) {
            throw new AppException('It is not possible to add users to another users group!', 401);
        }

        /* Find group by id */

        const users: IUserEntity[] = await this._userRepository.findAllByIds(users_ids);

        /* Exception estrategy guard */

        if (!users.length) {
            const payload = { ids: users_ids };

            throw new AppException(`Users not exists!`, 404, payload);
        }

        /* Set users in group */

        existsGroup.users = users;

        /* Save group */

        const groupSaved = await this._groupRepository.save(existsGroup);

        /* Return the group saved */

        return groupSaved;
    }
}

export { SaveGroupUserService };
