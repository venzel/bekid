import { v4 as uuid } from 'uuid';

import { ICreateCampaignQueueDTO } from '@modules/campaign_queue/dtos/ICreateCampaignQueueDTO';
import { ICampaignQueueEntity } from '@modules/campaign_queue/models/entities/ICampaignQueueEntity';
import { CampaignQueueInMemoryEntity } from '../models/entities/CampaignQueueInMemoryEntity';
import { ICampaignQueueRepository } from '@modules/campaign_queue/repositories/ICampaignQueueRepository';

class CampaignQueueInMemoryRepository implements ICampaignQueueRepository {
    private _repository: ICampaignQueueEntity[];

    constructor() {
        this._repository = [];
    }

    public async findOneByCampaignIdAndUserId(campaignId: string, userId: string): Promise<ICampaignQueueEntity | undefined> {
        return this._repository.find((data) => data.campaign_id === campaignId && data.user_id === userId);
    }

    public async findAllByUserId(userId: string): Promise<ICampaignQueueEntity[]> {
        return this._repository.filter((e) => e.user_id === userId);
    }

    public async create(data: ICreateCampaignQueueDTO): Promise<ICampaignQueueEntity> {
        const { campaign_id, user_id } = data;

        const campaignQueueInMemoryEntity = new CampaignQueueInMemoryEntity();

        const id = uuid();

        Object.assign(campaignQueueInMemoryEntity, { id, campaign_id, user_id });

        this._repository.push(campaignQueueInMemoryEntity);

        return campaignQueueInMemoryEntity;
    }

    public async save(campaignQueue: ICampaignQueueEntity): Promise<ICampaignQueueEntity> {
        const campaignQueueIndex: number = this._repository.indexOf(campaignQueue);

        if (campaignQueueIndex !== -1) {
            this._repository[campaignQueueIndex] = campaignQueue;
        }

        return campaignQueue;
    }

    public async delete(campaignQueue: ICampaignQueueEntity): Promise<ICampaignQueueEntity> {
        const campaignQueueIndex: number = this._repository.indexOf(campaignQueue);

        if (campaignQueueIndex !== -1) {
            this._repository.splice(campaignQueueIndex, 1);
        }

        return campaignQueue;
    }

    public async list(): Promise<ICampaignQueueEntity[]> {
        return this._repository;
    }
}

export { CampaignQueueInMemoryRepository };
