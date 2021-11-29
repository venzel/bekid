import { IGroupQueueEntity } from '@modules/group_queue/models/entities/IGroupQueueEntity';
import { ICreateGroupQueueDTO } from '@modules/group_queue/dtos/ICreateGroupQueueDTO';

interface IGroupQueueRepository {
    findOneByGroupIdAndUserId(campaignId: string, userId: string): Promise<IGroupQueueEntity | undefined>;

    findAllByUserId(userId: string): Promise<IGroupQueueEntity[]>;

    create(data: ICreateGroupQueueDTO): Promise<IGroupQueueEntity>;

    save(campaignQueue: IGroupQueueEntity): Promise<IGroupQueueEntity>;

    delete(campaignQueue: IGroupQueueEntity): Promise<IGroupQueueEntity>;

    list(): Promise<IGroupQueueEntity[]>;
}

export { IGroupQueueRepository };
