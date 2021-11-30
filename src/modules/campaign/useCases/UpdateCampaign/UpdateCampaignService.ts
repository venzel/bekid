import { injectable, inject } from 'tsyringe';

import { ICampaignRepository } from '@modules/campaign/repositories/ICampaignRepository';
import { IUpdateCampaignDTO } from '../../dtos/IUpdateCampaignDTO';
import { ICampaignEntity } from '@modules/campaign/models/entities/ICampaignEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class UpdateCampaignService {
    constructor(@inject('CampaignRepository') private _campaignRepository: ICampaignRepository) {}

    public async execute(data: IUpdateCampaignDTO): Promise<ICampaignEntity> {
        /* Destructuring object */

        const { user_token_id, user_token_role, campaign_id, name } = data;

        /* Find campaign by id */

        const existsCampaign = await this._campaignRepository.findOneById(campaign_id);

        /* Strategy guard */

        if (!existsCampaign) {
            throw new AppException(`Campaign id ${campaign_id} not found!`, 404);
        }

        /* Check authority */

        if (user_token_role !== 'ADMIN' && existsCampaign.user_id !== user_token_id) {
            throw new AppException(`It is not possible to update a campaign of another user!`, 401);
        }

        /* Data update */

        existsCampaign.name = name;

        /* Data saved in repository */

        const updatedCampaign = await this._campaignRepository.save(existsCampaign);

        /* Returns the campaign found */

        return updatedCampaign;
    }
}

export { UpdateCampaignService };
