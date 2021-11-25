import { injectable, inject } from 'tsyringe';
import { ICampaignRepository } from '@modules/campaign/repositories/ICampaignRepository';
import { ICampaignEntity } from '@modules/campaign/models/entities/ICampaignEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class DeleteCampaignService {
    constructor(@inject('CampaignRepository') private _campaignRepository: ICampaignRepository) {}

    public async execute(campaignId: string): Promise<ICampaignEntity> {
        /* Find by campaign id */

        const existsCampaign = await this._campaignRepository.findOneById(campaignId);

        /* Exception estrategy guard */

        if (!existsCampaign) {
            throw new AppException('Campaign not exists!', 404);
        }

        /* Data delete (update) in repository */

        await this._campaignRepository.delete(existsCampaign);

        /* Returns the campaign found */

        return existsCampaign;
    }
}

export { DeleteCampaignService };
