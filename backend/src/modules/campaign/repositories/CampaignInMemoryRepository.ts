import { v4 as uuid } from 'uuid';

import { ICreateCampaignDTO } from '@modules/campaign/dtos/ICreateCampaignDTO';
import { ICampaignEntity } from '@modules/campaign/models/entities/ICampaignEntity';
import { CampaignInMemoryEntity } from '../models/entities/CampaignInMemoryEntity';
import { ICampaignRepository } from '@modules/campaign/repositories/ICampaignRepository';

class CampaignInMemoryRepository implements ICampaignRepository {
    private _repository: ICampaignEntity[];

    constructor() {
        this._repository = [];
    }

    public async findOneById(campaignId: string): Promise<ICampaignEntity | undefined> {
        return this._repository.find((data) => data.id === campaignId);
    }

    public async findOneByName(campaignName: string): Promise<ICampaignEntity | undefined> {
        return this._repository.find((data) => data.name === campaignName);
    }

    public async create(data: ICreateCampaignDTO): Promise<ICampaignEntity> {
        const { group_id, user_token_id, name } = data;

        const campaignInMemoryEntity = new CampaignInMemoryEntity();

        const id = uuid();

        Object.assign(campaignInMemoryEntity, { id, group_id, user_id: user_token_id, name });

        this._repository.push(campaignInMemoryEntity);

        return campaignInMemoryEntity;
    }

    public async save(campaign: ICampaignEntity): Promise<ICampaignEntity> {
        const campaignIndex: number = this._repository.indexOf(campaign);

        if (campaignIndex !== -1) {
            this._repository[campaignIndex] = campaign;
        }

        return campaign;
    }

    public async delete(campaign: ICampaignEntity): Promise<ICampaignEntity> {
        const campaignIndex: number = this._repository.indexOf(campaign);

        if (campaignIndex !== -1) {
            this._repository.splice(campaignIndex, 1);
        }

        return campaign;
    }

    public async list(): Promise<ICampaignEntity[]> {
        return this._repository;
    }
}

export { CampaignInMemoryRepository };
