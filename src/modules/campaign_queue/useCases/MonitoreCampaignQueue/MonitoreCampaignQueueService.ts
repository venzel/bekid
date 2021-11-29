import { injectable, inject } from 'tsyringe';

import { ICampaignQueueRepository } from '@modules/campaign_queue/repositories/ICampaignQueueRepository';
import { ICampaignQueueEntity } from '@modules/campaign_queue/models/entities/ICampaignQueueEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class MonitoreCampaignQueueService {
    constructor(@inject('CampaignQueueRepository') private _campaignQueueRepository: ICampaignQueueRepository) {}

    public async execute(userId: string): Promise<ICampaignQueueEntity[]> {
        return await this._campaignQueueRepository.findAllByUserId(userId);
    }
}

export { MonitoreCampaignQueueService };
