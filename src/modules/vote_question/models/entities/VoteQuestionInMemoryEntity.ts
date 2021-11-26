import { IVoteQuestionEntity } from './IVoteQuestionEntity';

class VoteQuestionInMemoryEntity implements IVoteQuestionEntity {
    id: string;
    vote_id?: string;
    question_id?: string;
    user_id: string;
    created_at: Date;
}

export { VoteQuestionInMemoryEntity };
