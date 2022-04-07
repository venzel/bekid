import { IVoteCommentEntity } from './IVoteCommentEntity';

class VoteCommentInMemoryEntity implements IVoteCommentEntity {
    id: string;
    vote_id: string;
    user_id: string;
    message: string;
    created_at: Date;
}

export { VoteCommentInMemoryEntity };
