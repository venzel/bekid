interface ICreateVoteDTO {
    vote_id?: string;
    campaign_id: string;
    emotion_id: string;
    user_id: string;
}

export { ICreateVoteDTO };
