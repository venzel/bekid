interface ICreateVoteCommentDTO {
    vote_comment_id?: string;
    vote_id: string;
    user_id: string;
    message: string;
}

export { ICreateVoteCommentDTO };
