import { v4 as uuid } from 'uuid';

import { ICreateVoteDTO } from '@modules/vote/dtos/ICreateVoteDTO';
import { IVoteEntity } from '@modules/vote/models/entities/IVoteEntity';
import { IVoteRepository } from '@modules/vote/repositories/IVoteRepository';
import { VoteInMemoryEntity } from '../models/entities/VoteInMemoryEntity';

class VoteInMemoryRepository implements IVoteRepository {
    private _repository: IVoteEntity[];

    constructor() {
        this._repository = [];
    }

    public async findOneById(voteId: string): Promise<IVoteEntity | undefined> {
        return this._repository.find((data) => data.id === voteId);
    }

    public async findOneByCampaignId(campaignId: string): Promise<IVoteEntity | undefined> {
        return this._repository.find((data) => data.campaign_id === campaignId);
    }

    public async findOneByEmotionId(emotionId: string): Promise<IVoteEntity | undefined> {
        return this._repository.find((data) => data.emotion_id === emotionId);
    }

    public async findOneByUserId(userId: string): Promise<IVoteEntity | undefined> {
        return this._repository.find((data) => data.user_id === userId);
    }

    public async create(data: ICreateVoteDTO): Promise<IVoteEntity> {
        const { campaign_id, emotion_id, user_token_id } = data;

        const voteInMemoryEntity = new VoteInMemoryEntity();

        const id = uuid();

        Object.assign(voteInMemoryEntity, { id, campaign_id, emotion_id, user_id: user_token_id });

        this._repository.push(voteInMemoryEntity);

        return voteInMemoryEntity;
    }

    public async save(vote: IVoteEntity): Promise<IVoteEntity> {
        const voteIndex: number = this._repository.indexOf(vote);

        if (voteIndex !== -1) {
            this._repository[voteIndex] = vote;
        }

        return vote;
    }

    public async delete(vote: IVoteEntity): Promise<IVoteEntity> {
        const voteIndex: number = this._repository.indexOf(vote);

        if (voteIndex !== -1) {
            this._repository.splice(voteIndex, 1);
        }

        return vote;
    }

    public async listAllByUserId(userId: string): Promise<IVoteEntity[]> {
        return this._repository.filter((data) => data.user_id === userId);
    }

    public async list(): Promise<IVoteEntity[]> {
        return this._repository;
    }
}

export { VoteInMemoryRepository };
