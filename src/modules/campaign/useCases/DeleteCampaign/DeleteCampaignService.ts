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

        /* Strategy guard */

        if (!existsCampaign) {
            throw new AppException(`Campaign id ${campaignId} not found!`, 404);
        }

        /* Data delete (update) in repository */

        await this._campaignRepository.delete(existsCampaign);

        /* Set campaign id in object */

        existsCampaign.id = campaignId;

        /* Returns the campaign found */

        return existsCampaign;
    }
}

export { DeleteCampaignService };
