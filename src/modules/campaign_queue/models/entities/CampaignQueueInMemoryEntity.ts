import { ICampaignQueueEntity } from './ICampaignQueueEntity';

class CampaignQueueInMemoryEntity implements ICampaignQueueEntity {
    id: string;
    campaign_id: string;
    user_id: string;
    created_at: Date;
}

export { CampaignQueueInMemoryEntity };
