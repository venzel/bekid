import { IVoteReasonEntity } from './IVoteReasonEntity';

class VoteReasonInMemoryEntity implements IVoteReasonEntity {
    id: string;
    vote_id: string;
    reason_id: string;
    user_id: string;
    created_at: Date;
}

export { VoteReasonInMemoryEntity };
