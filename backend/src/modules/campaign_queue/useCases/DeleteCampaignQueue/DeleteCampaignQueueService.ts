import { injectable, inject } from 'tsyringe';

import { ICampaignQueueRepository } from '@modules/campaign_queue/repositories/ICampaignQueueRepository';
import { ICampaignQueueEntity } from '@modules/campaign_queue/models/entities/ICampaignQueueEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class DeleteCampaignQueueService {
    constructor(@inject('CampaignQueueRepository') private _campaignQueueRepository: ICampaignQueueRepository) {}

    public async execute(campaignId: string, userId: string): Promise<ICampaignQueueEntity> {
        /* Find by campaign queue id */

        const existsCampaignQueue = await this._campaignQueueRepository.findOneByCampaignIdAndUserId(campaignId, userId);

        /* Strategy guard */

        if (!existsCampaignQueue) {
            throw new AppException(`Campaign queue not found!`, 404);
        }

        /* Data delete in repository */

        await this._campaignQueueRepository.delete(existsCampaignQueue);

        /* Set campaignQueue id in object */

        existsCampaignQueue.id = campaignId;

        /* Returns the campaignQueue found */

        return existsCampaignQueue;
    }
}

export { DeleteCampaignQueueService };
