interface IVoteActorEntity {
    id: string;
    vote_id: string;
    actor_id: string;
    user_id: string;
    created_at: Date;
}

export { IVoteActorEntity };