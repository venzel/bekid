import { getRepository, Repository } from 'typeorm';

import { ICreateCampaignDTO } from '@modules/campaign/dtos/ICreateCampaignDTO';
import { ICampaignEntity } from '@modules/campaign/models/entities/ICampaignEntity';
import { CampaignPostgresEntity } from '../entities/CampaignPostgresEntity';
import { ICampaignRepository } from '@modules/campaign/repositories/ICampaignRepository';

class CampaignPostgresRepository implements ICampaignRepository {
    private _repository: Repository<ICampaignEntity>;

    constructor() {
        this._repository = getRepository(CampaignPostgresEntity, 'default');
    }

    public async findOneById(campaignId: string): Promise<ICampaignEntity | undefined> {
        return await this._repository.findOne({ where: { id: campaignId } });
    }

    public async findOneByName(campaignName: string): Promise<ICampaignEntity | undefined> {
        return await this._repository.findOne({ where: { name: campaignName } });
    }

    public async create(data: ICreateCampaignDTO): Promise<ICampaignEntity> {
        const { group_id, user_id, name } = data;

        const campaignCreated = this._repository.create({ group_id, user_id, name });

        await this._repository.save(campaignCreated);

        return campaignCreated;
    }

    public async save(campaign: ICampaignEntity): Promise<ICampaignEntity> {
        await this._repository.save(campaign);

        return campaign;
    }

    public async delete(campaign: ICampaignEntity): Promise<ICampaignEntity> {
        await this._repository.remove(campaign);

        return campaign;
    }

    public async list(): Promise<ICampaignEntity[]> {
        return await this._repository.find();
    }
}

export { CampaignPostgresRepository };
