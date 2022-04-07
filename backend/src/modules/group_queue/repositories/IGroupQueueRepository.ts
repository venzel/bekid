import { IGroupQueueEntity } from '@modules/group_queue/models/entities/IGroupQueueEntity';
import { ICreateGroupQueueDTO } from '@modules/group_queue/dtos/ICreateGroupQueueDTO';

interface IGroupQueueRepository {
    findOneById(groupQueueId: string): Promise<IGroupQueueEntity | undefined>;

    findOneByGroupIdAndUserId(campaignId: string, userId: string): Promise<IGroupQueueEntity | undefined>;

    create(data: ICreateGroupQueueDTO): Promise<IGroupQueueEntity>;

    save(campaignQueue: IGroupQueueEntity): Promise<IGroupQueueEntity>;

    delete(campaignQueue: IGroupQueueEntity): Promise<IGroupQueueEntity>;

    listAllByUserId(userId: string): Promise<IGroupQueueEntity[]>;

    list(): Promise<IGroupQueueEntity[]>;
}

export { IGroupQueueRepository };
