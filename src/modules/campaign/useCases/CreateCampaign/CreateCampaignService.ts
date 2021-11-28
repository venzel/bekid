import { injectable, inject } from 'tsyringe';

import { ICampaignEntity } from '@modules/campaign/models/entities/ICampaignEntity';
import { ICampaignRepository } from '@modules/campaign/repositories/ICampaignRepository';
import { ICreateCampaignDTO } from '@modules/campaign/dtos/ICreateCampaignDTO';
import { IGroupRepository } from '@modules/group/repositories/IGroupRepository';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class CreateCampaignService {
    constructor(
        @inject('CampaignRepository') private _campaignRepository: ICampaignRepository,
        @inject('GroupRepository') private _grouRepository: IGroupRepository
    ) {}

    public async execute(data: ICreateCampaignDTO): Promise<ICampaignEntity> {
        const { group_id, user_id, name } = data;

        /* Find group by id */

        const existsGroup = await this._grouRepository.findOneById(group_id);

        /* Exception estrategy guard */

        if (!existsGroup) {
            throw new AppException(`Group id ${group_id} not found!`, 404);
        }

        /* Find campaign by name */

        const existsCampaign = await this._campaignRepository.findOneByName(name);

        /* Exception estrategy guard */

        if (existsCampaign) {
            const { id, name } = existsCampaign;

            const payload = { id, name };

            throw new AppException(`Campaign name already exists!`, 400, payload);
        }

        /* Create campaign */

        const campaignCreated = await this._campaignRepository.create({ group_id, user_id, name });

        /* Return the campaign created */

        return campaignCreated;
    }
}

export { CreateCampaignService };
