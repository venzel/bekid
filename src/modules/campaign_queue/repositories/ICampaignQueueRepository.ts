import { ICampaignQueueEntity } from '@modules/campaign_queue/models/entities/ICampaignQueueEntity';
import { ICreateCampaignQueueDTO } from '@modules/campaign_queue/dtos/ICreateCampaignQueueDTO';

interface ICampaignQueueRepository {
    findOneByCampaignIdAndUserId(campaignId: string, userId: string): Promise<ICampaignQueueEntity | undefined>;

    findAllByUserId(userId: string): Promise<ICampaignQueueEntity[]>;

    create(data: ICreateCampaignQueueDTO): Promise<ICampaignQueueEntity>;

    save(campaignQueue: ICampaignQueueEntity): Promise<ICampaignQueueEntity>;

    delete(campaignQueue: ICampaignQueueEntity): Promise<ICampaignQueueEntity>;

    list(): Promise<ICampaignQueueEntity[]>;
}

export { ICampaignQueueRepository };
