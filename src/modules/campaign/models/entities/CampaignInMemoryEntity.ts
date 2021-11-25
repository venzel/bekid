import { ICampaignEntity } from './ICampaignEntity';

class CampaignInMemoryEntity implements ICampaignEntity {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}

export { CampaignInMemoryEntity };
