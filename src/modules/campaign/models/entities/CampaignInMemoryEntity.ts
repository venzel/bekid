import { ICampaignEntity } from './ICampaignEntity';

class CampaignInMemoryEntity implements ICampaignEntity {
    id: string;
    group_id: string;
    user_id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}

export { CampaignInMemoryEntity };
