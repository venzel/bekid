interface IVoteQuestionEntity {
    id: string;
    vote_id?: string;
    question_id?: string;
    user_id: string;
    created_at: Date;
}

export { IVoteQuestionEntity };
