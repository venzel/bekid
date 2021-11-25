import { injectable, inject } from 'tsyringe';
import { ICampaignEntity } from '@modules/campaign/models/entities/ICampaignEntity';
import { ICampaignRepository } from '@modules/campaign/repositories/ICampaignRepository';

@injectable()
class ListCampaignService {
    constructor(@inject('CampaignRepository') private _campaignRepository: ICampaignRepository) {}

    public async execute(): Promise<ICampaignEntity[]> {
        return await this._campaignRepository.list();
    }
}

export { ListCampaignService };
