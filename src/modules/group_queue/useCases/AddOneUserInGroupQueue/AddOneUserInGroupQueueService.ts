import { injectable, inject } from 'tsyringe';

import { IAddOneUserInGroupQueueDTO } from '@modules/group_queue/dtos/IAddOneUserInGroupQueueDTO';
import { IGroupQueueRepository } from '@modules/group_queue/repositories/IGroupQueueRepository';
import { IGroupRepository } from '@modules/group/repositories/IGroupRepository';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IGroupQueueEntity } from '@modules/group_queue/models/entities/IGroupQueueEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class AddOneUserInGroupQueueService {
    constructor(
        @inject('GroupQueueRepository') private _groupQueueRepository: IGroupQueueRepository,
        @inject('GroupRepository') private _groupRepository: IGroupRepository,
        @inject('UserRepository') private _userRepository: IUserRepository
    ) {}

    public async execute(data: IAddOneUserInGroupQueueDTO): Promise<IGroupQueueEntity> {
        /* Destructuring object */

        const { group_id, user_id, user_token_id } = data;

        /* Find group by id */

        const existsGroup = await this._groupRepository.findOneById(group_id);

        /* Strategy guard */

        if (!existsGroup) {
            throw new AppException(`Group id ${group_id} not found!`, 404);
        }

        /* Check authority */

        if (existsGroup.user_id !== user_token_id) {
            throw new AppException(`It is not possible to manipulate a group of another user!`, 401);
        }

        /* Find user by id */

        const existsUser = await this._userRepository.findOneById(user_id);

        /* Strategy guard */

        if (!existsUser) {
            throw new AppException(`User id ${user_id} not found!`, 404);
        }

        /* Check if exists already user in group */

        if (existsGroup.users.includes(existsUser)) {
            throw new AppException(`User is already in the group!`, 400);
        }

        /* Create object in repository */

        const groupQueueCreated = await this._groupQueueRepository.create({ group_id, user_id });

        /* Return group queue created */

        return groupQueueCreated;
    }
}

export { AddOneUserInGroupQueueService };
