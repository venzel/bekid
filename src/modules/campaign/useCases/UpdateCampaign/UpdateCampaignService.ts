import { injectable, inject } from 'tsyringe';
import { ICampaignRepository } from '@modules/campaign/repositories/ICampaignRepository';
import { IUpdateCampaignDTO } from '../../dtos/IUpdateCampaignDTO';
import { ICampaignEntity } from '@modules/campaign/models/entities/ICampaignEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class UpdateCampaignService {
    constructor(@inject('CampaignRepository') private _campaignRepository: ICampaignRepository) {}

    public async execute(campaignId: string, data: IUpdateCampaignDTO): Promise<ICampaignEntity> {
        const { name } = data;

        /* Find campaign by id */

        const existsCampaignWithId = await this._campaignRepository.findOneById(campaignId);

        /* Exception estrategy guard */

        if (!existsCampaignWithId) {
            throw new AppException('Campaign not found!', 404);
        }

        /* Data update */

        existsCampaignWithId.name = name;

        /* Data saved in repository */

        const updatedCampaign = await this._campaignRepository.save(existsCampaignWithId);

        /* Returns the campaign found */

        return updatedCampaign;
    }
}

export { UpdateCampaignService };
