import { injectable, inject, container } from 'tsyringe';

import { ICampaignEntity } from '@modules/campaign/models/entities/ICampaignEntity';
import { ICampaignRepository } from '@modules/campaign/repositories/ICampaignRepository';
import { ICreateCampaignDTO } from '@modules/campaign/dtos/ICreateCampaignDTO';
import { IGroupRepository } from '@modules/group/repositories/IGroupRepository';
import { AppException } from '@shared/exceptions/AppException';
import { CreateCampaignQueueService } from '@modules/campaign_queue/useCases/CreateCampaignQueue/CreateCampaignQueueService';

@injectable()
class CreateCampaignService {
    constructor(
        @inject('CampaignRepository') private _campaignRepository: ICampaignRepository,
        @inject('GroupRepository') private _groupRepository: IGroupRepository
    ) {}

    public async execute(data: ICreateCampaignDTO): Promise<ICampaignEntity> {
        /* Destructuring object */

        const { user_token_id, group_id, name } = data;

        /* Find group by id */

        const existsGroup = await this._groupRepository.findOneById(group_id);

        /* Strategy guard */

        if (!existsGroup) {
            throw new AppException(`Group id ${group_id} not found!`, 404);
        }

        /* Check authority */

        if (existsGroup.user_id !== user_token_id) {
            throw new AppException(`It is not possible to use a group of another user!`, 401);
        }

        /* Find campaign by name */

        const existsCampaign = await this._campaignRepository.findOneByName(name);

        /* Strategy guard */

        if (existsCampaign) {
            const { id, name } = existsCampaign;

            const payload = { id, name };

            throw new AppException(`Campaign name already exists!`, 400, payload);
        }

        /* Data */

        const campaign = {
            user_token_id,
            group_id,
            name,
        };

        /* Create campaign */

        const campaignCreated = await this._campaignRepository.create(campaign);

        /* Use create campaign queue service */

        const createCampaignQueueService = container.resolve(CreateCampaignQueueService);

        /* Iterate in group users */

        existsGroup.users.forEach((user) => createCampaignQueueService.execute(campaignCreated.id, user.id));

        /* Return the campaign created */

        return campaignCreated;
    }
}

export { CreateCampaignService };
