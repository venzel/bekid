import { IVoteEntity } from './IVoteEntity';

class VoteInMemoryEntity implements IVoteEntity {
    id: string;
    campaign_id: string;
    emotion_id: string;
    user_id: string;
    created_at: Date;
}

export { VoteInMemoryEntity };
