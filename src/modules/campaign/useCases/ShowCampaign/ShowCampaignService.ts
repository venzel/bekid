import { injectable, inject } from 'tsyringe';
import { ICampaignRepository } from '@modules/campaign/repositories/ICampaignRepository';
import { ICampaignEntity } from '@modules/campaign/models/entities/ICampaignEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class ShowCampaignService {
    constructor(@inject('CampaignRepository') private _campaignRepository: ICampaignRepository) {}

    public async execute(campaignId: string): Promise<ICampaignEntity> {
        const existsCampaign = await this._campaignRepository.findOneById(campaignId);

        if (!existsCampaign) {
            throw new AppException('Campaign not exists!', 404);
        }

        return existsCampaign;
    }
}

export { ShowCampaignService };
