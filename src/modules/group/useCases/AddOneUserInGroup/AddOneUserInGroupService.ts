import { injectable, inject, container } from 'tsyringe';

import { IAddOneUserInGroupDTO } from '@modules/group/dtos/IAddOneUserInGroupDTO';
import { IGroupEntity } from '@modules/group/models/entities/IGroupEntity';
import { IGroupRepository } from '@modules/group/repositories/IGroupRepository';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppException } from '@shared/exceptions/AppException';
import { DeleteOneUserInGroupQueueService } from '@modules/group_queue/useCases/DeleteOneUserInGroupQueue/DeleteOneUserInGroupQueueService';

@injectable()
class AddOneUserInGroupService {
    constructor(
        @inject('GroupRepository') private _groupRepository: IGroupRepository,
        @inject('UserRepository') private _userRepository: IUserRepository
    ) {}

    public async execute(data: IAddOneUserInGroupDTO): Promise<IGroupEntity> {
        /* Destructuring object */

        const { group_queue_id, group_id, user_id, user_token_id } = data;

        /* Find group by id */

        const existsGroup = await this._groupRepository.findOneById(group_id);

        /* Strategy guard */

        if (!existsGroup) {
            throw new AppException(`Grpup id ${group_id} not found!`, 404);
        }

        /* Check authority */

        if (existsGroup.user_id !== user_token_id) {
            throw new AppException('It is not possible to add users to another users group!', 401);
        }

        /* Find user by id */

        const existsUser = await this._userRepository.findOneById(user_id);

        /* Strategy guard */

        if (!existsUser) {
            throw new AppException(`User id ${user_id} not found!`, 404);
        }

        /* Add user in group */

        existsGroup.users.push(existsUser);

        /* Object save in repository */

        const groupSaved = await this._groupRepository.save(existsGroup);

        /* Use service another module */

        const deleteOneUserInGroupQueueService = container.resolve(DeleteOneUserInGroupQueueService);

        /* Data service */

        const data_ = {
            group_queue_id,
            user_token_id,
        };

        /* Execute service */

        await deleteOneUserInGroupQueueService.execute(data_);

        /* Return the group saved */

        return groupSaved;
    }
}

export { AddOneUserInGroupService };
