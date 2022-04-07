import { getRepository, Repository } from 'typeorm';

import { ICampaignQueueEntity } from '@modules/campaign_queue/models/entities/ICampaignQueueEntity';
import { CampaignQueuePostgresEntity } from '../entities/CampaignQueuePostgresEntity';
import { ICampaignQueueRepository } from '@modules/campaign_queue/repositories/ICampaignQueueRepository';
import { ICreateCampaignQueueDTO } from '@modules/campaign_queue/dtos/ICreateCampaignQueueDTO';

class CampaignQueuePostgresRepository implements ICampaignQueueRepository {
    private _repository: Repository<ICampaignQueueEntity>;

    constructor() {
        this._repository = getRepository(CampaignQueuePostgresEntity, 'default');
    }

    public async findOneByCampaignIdAndUserId(campaignId: string, userId: string): Promise<ICampaignQueueEntity | undefined> {
        return await this._repository.findOne({ where: { campaign_id: campaignId, user_id: userId } });
    }

    public async findAllByUserId(userId: string): Promise<ICampaignQueueEntity[]> {
        return await this._repository.find({ where: { user_id: userId } });
    }

    public async create(data: ICreateCampaignQueueDTO): Promise<ICampaignQueueEntity> {
        const { campaign_id, user_id } = data;

        const campaignQueueCreated = this._repository.create({ campaign_id, user_id });

        await this._repository.save(campaignQueueCreated);

        return campaignQueueCreated;
    }

    public async save(campaignQueue: ICampaignQueueEntity): Promise<ICampaignQueueEntity> {
        await this._repository.save(campaignQueue);

        return campaignQueue;
    }

    public async delete(campaignQueue: ICampaignQueueEntity): Promise<ICampaignQueueEntity> {
        await this._repository.remove(campaignQueue);

        return campaignQueue;
    }

    public async list(): Promise<ICampaignQueueEntity[]> {
        return await this._repository.find();
    }
}

export { CampaignQueuePostgresRepository };
