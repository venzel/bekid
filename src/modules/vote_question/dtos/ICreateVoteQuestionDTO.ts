interface ICreateVoteQuestionDTO {
    vote_question_id?: string;
    vote_id?: string;
    question_id?: string;
    user_id: string;
}

export { ICreateVoteQuestionDTO };
