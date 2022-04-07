import { injectable, inject } from 'tsyringe';

import { ICampaignDTO } from '@modules/campaign/dtos/ICampaignDTO';
import { ICampaignRepository } from '@modules/campaign/repositories/ICampaignRepository';
import { ICampaignEntity } from '@modules/campaign/models/entities/ICampaignEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class DeleteCampaignService {
    constructor(@inject('CampaignRepository') private _campaignRepository: ICampaignRepository) {}

    public async execute(data: ICampaignDTO): Promise<ICampaignEntity> {
        /* Destructuring object */

        const { user_token_id, user_token_role, campaign_id } = data;

        /* Find by campaign id */

        const existsCampaign = await this._campaignRepository.findOneById(campaign_id);

        /* Strategy guard */

        if (!existsCampaign) {
            throw new AppException(`Campaign id ${campaign_id} not found!`, 404);
        }

        /* Check authority */

        if (user_token_role !== 'ADMIN' && existsCampaign.user_id !== user_token_id) {
            throw new AppException(`It is not possible to delete a campaign of another user!`, 401);
        }

        /* Data delete in repository */

        await this._campaignRepository.delete(existsCampaign);

        /* Set campaign id in object */

        existsCampaign.id = campaign_id;

        /* Returns the campaign found */

        return existsCampaign;
    }
}

export { DeleteCampaignService };
