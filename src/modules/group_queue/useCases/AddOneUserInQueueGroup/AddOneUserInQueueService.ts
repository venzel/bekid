import { injectable, inject } from 'tsyringe';

import { IAddOneUserInQueueDTO } from '@modules/group_queue/dtos/IAddOneUserInQueueDTO';
import { IGroupQueueRepository } from '@modules/group_queue/repositories/IGroupQueueRepository';
import { IGroupRepository } from '@modules/group/repositories/IGroupRepository';
import { AppException } from '@shared/exceptions/AppException';
import { IGroupQueueEntity } from '@modules/group_queue/models/entities/IGroupQueueEntity';

@injectable()
class AddOneUserInQueueService {
    constructor(
        @inject('GroupQueueRepository') private _groupQueueRepository: IGroupQueueRepository,
        @inject('GroupRepository') private _groupRepository: IGroupRepository
    ) {}

    public async execute(data: IAddOneUserInQueueDTO, userTokenId: string): Promise<IGroupQueueEntity> {
        const { group_id, user_id } = data;

        /* Find group by id */

        const existsGroup = await this._groupRepository.findOneById(group_id);

        /* Exception estrategy guard */

        if (!existsGroup) {
            throw new AppException(`Group id ${group_id} not found!`, 404);
        }

        /* The group manager arrives */

        if (existsGroup.user_id !== userTokenId) {
            throw new AppException(`It is not possible to manipulate a group of another user!`, 404);
        }

        /* Create group queuen in repository*/

        const groupQueueCreated = await this._groupQueueRepository.create({ group_id, user_id });

        /* Return group queue created */

        return groupQueueCreated;
    }
}

export { AddOneUserInQueueService };
