interface IVoteCommentEntity {
    id: string;
    vote_id: string;
    user_id: string;
    message: string;
    created_at: Date;
}

export { IVoteCommentEntity };
