import { injectable, inject } from 'tsyringe';

import { IGroupQueueRepository } from '@modules/group_queue/repositories/IGroupQueueRepository';
import { IGroupQueueEntity } from '@modules/group_queue/models/entities/IGroupQueueEntity';

@injectable()
class MonitoreGroupQueueService {
    constructor(@inject('GroupQueueRepository') private _groupQueueRepository: IGroupQueueRepository) {}

    public async execute(userId: string): Promise<IGroupQueueEntity[]> {
        return await this._groupQueueRepository.listAllByUserId(userId);
    }
}

export { MonitoreGroupQueueService };
