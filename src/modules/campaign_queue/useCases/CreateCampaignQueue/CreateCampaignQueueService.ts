import { injectable, inject } from 'tsyringe';

import { ICampaignQueueRepository } from '@modules/campaign_queue/repositories/ICampaignQueueRepository';

@injectable()
class CreateCampaignQueueService {
    constructor(@inject('CampaignQueueRepository') private _campaignQueueRepository: ICampaignQueueRepository) {}

    public async execute(campaignId: string, userId: string): Promise<void> {
        await this._campaignQueueRepository.create({ campaign_id: campaignId, user_id: userId });
    }
}

export { CreateCampaignQueueService };
