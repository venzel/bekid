import { getRepository, Repository } from 'typeorm';

import { ICreateVoteReasonDTO } from '@modules/vote_reason/dtos/ICreateVoteReasonDTO';
import { IVoteReasonEntity } from '@modules/vote_reason/models/entities/IVoteReasonEntity';
import { VoteReasonPostgresEntity } from '../entities/VoteReasonPostgresEntity';
import { IVoteReasonRepository } from '@modules/vote_reason/repositories/IVoteReasonRepository';

class VoteReasonPostgresRepository implements IVoteReasonRepository {
    private _repository: Repository<IVoteReasonEntity>;

    constructor() {
        this._repository = getRepository(VoteReasonPostgresEntity, 'default');
    }

    public async findOneById(voteReasonId: string): Promise<IVoteReasonEntity | undefined> {
        return await this._repository.findOne({ where: { id: voteReasonId } });
    }

    public async findOneByCampaignId(campaignId: string): Promise<IVoteReasonEntity | undefined> {
        return await this._repository.findOne({ where: { campaign_id: campaignId } });
    }

    public async findOneByEmotionId(emotionId: string): Promise<IVoteReasonEntity | undefined> {
        return await this._repository.findOne({ where: { emotion_id: emotionId } });
    }

    public async findOneByUserId(userId: string): Promise<IVoteReasonEntity | undefined> {
        return await this._repository.findOne({ where: { user_id: userId } });
    }

    public async create(data: ICreateVoteReasonDTO): Promise<IVoteReasonEntity> {
        const { vote_id, reason_id, user_token_id } = data;

        const voteReasonCreated = this._repository.create({ vote_id, reason_id, user_id: user_token_id });

        await this._repository.save(voteReasonCreated);

        return voteReasonCreated;
    }

    public async save(voteReason: IVoteReasonEntity): Promise<IVoteReasonEntity> {
        await this._repository.save(voteReason);

        return voteReason;
    }

    public async delete(voteReason: IVoteReasonEntity): Promise<IVoteReasonEntity> {
        await this._repository.remove(voteReason);

        return voteReason;
    }

    public async list(): Promise<IVoteReasonEntity[]> {
        return await this._repository.find({
            relations: ['vote', 'reason', 'user'],
        });
    }
}

export { VoteReasonPostgresRepository };
