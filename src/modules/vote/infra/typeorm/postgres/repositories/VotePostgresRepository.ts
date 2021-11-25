import { getRepository, Repository } from 'typeorm';
import { ICreateVoteDTO } from '@modules/vote/dtos/ICreateVoteDTO';
import { IVoteEntity } from '@modules/vote/models/entities/IVoteEntity';
import { VotePostgresEntity } from '../entities/VotePostgresEntity';
import { IVoteRepository } from '@modules/vote/repositories/IVoteRepository';

class VotePostgresRepository implements IVoteRepository {
    private _repository: Repository<IVoteEntity>;

    constructor() {
        this._repository = getRepository(VotePostgresEntity, 'default');
    }

    public async findOneById(voteId: string): Promise<IVoteEntity | undefined> {
        return await this._repository.findOne({ where: { id: voteId } });
    }

    public async findOneByCampaignId(campaignId: string): Promise<IVoteEntity | undefined> {
        return await this._repository.findOne({ where: { campaign_id: campaignId } });
    }

    public async findOneByEmotionId(emotionId: string): Promise<IVoteEntity | undefined> {
        return await this._repository.findOne({ where: { emotion_id: emotionId } });
    }

    public async findOneByUserId(userId: string): Promise<IVoteEntity | undefined> {
        return await this._repository.findOne({ where: { user_id: userId } });
    }

    public async create(data: ICreateVoteDTO): Promise<IVoteEntity> {
        const { vote_id: id, campaign_id, emotion_id, user_id } = data;

        const voteCreated = this._repository.create({ id, campaign_id, emotion_id, user_id });

        await this._repository.save(voteCreated);

        return voteCreated;
    }

    public async save(vote: IVoteEntity): Promise<IVoteEntity> {
        await this._repository.save(vote);

        return vote;
    }

    public async delete(vote: IVoteEntity): Promise<IVoteEntity> {
        await this._repository.remove(vote);

        return vote;
    }

    public async list(): Promise<IVoteEntity[]> {
        return await this._repository.find({
            relations: ['campaign', 'emotion', 'user'],
        });
    }
}

export { VotePostgresRepository };
