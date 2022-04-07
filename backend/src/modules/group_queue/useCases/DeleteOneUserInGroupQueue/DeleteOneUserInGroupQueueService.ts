import { injectable, inject } from 'tsyringe';

import { IDeleteOneUserInGroupQueueDTO } from '@modules/group_queue/dtos/IDeleteOneUserInGroupQueueDTO';
import { IGroupQueueRepository } from '@modules/group_queue/repositories/IGroupQueueRepository';
import { IGroupQueueEntity } from '@modules/group_queue/models/entities/IGroupQueueEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class DeleteOneUserInGroupQueueService {
    constructor(@inject('GroupQueueRepository') private _groupQueueRepository: IGroupQueueRepository) {}

    public async execute(data: IDeleteOneUserInGroupQueueDTO): Promise<IGroupQueueEntity> {
        /* Destructuring object */

        const { group_queue_id, user_token_id } = data;

        /* Find group queue by id */

        const existsGroupQueue = await this._groupQueueRepository.findOneById(group_queue_id);

        /* Strategy guard */

        if (!existsGroupQueue) {
            throw new AppException(`Group queue id ${group_queue_id} not found!`, 404);
        }

        /* Check authority */

        if (existsGroupQueue.user_id !== user_token_id) {
            throw new AppException(`It is not possible to delete a group queue from another user!`, 401);
        }

        /* Object delete in repository */

        await this._groupQueueRepository.delete(existsGroupQueue);

        /* Set group id in object */

        existsGroupQueue.id = group_queue_id;

        /* Returns the group queue found */

        return existsGroupQueue;
    }
}

export { DeleteOneUserInGroupQueueService };
