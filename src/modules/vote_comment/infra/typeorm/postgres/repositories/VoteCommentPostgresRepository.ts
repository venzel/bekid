import { getRepository, Repository } from 'typeorm';
import { ICreateVoteCommentDTO } from '@modules/vote_comment/dtos/ICreateVoteCommentDTO';
import { IVoteCommentEntity } from '@modules/vote_comment/models/entities/IVoteCommentEntity';
import { VoteCommentPostgresEntity } from '../entities/VoteCommentPostgresEntity';
import { IVoteCommentRepository } from '@modules/vote_comment/repositories/IVoteCommentRepository';

class VoteCommentPostgresRepository implements IVoteCommentRepository {
    private _repository: Repository<IVoteCommentEntity>;

    constructor() {
        this._repository = getRepository(VoteCommentPostgresEntity, 'default');
    }

    public async findOneById(vote_questionId: string): Promise<IVoteCommentEntity | undefined> {
        return await this._repository.findOne({ where: { id: vote_questionId } });
    }

    public async findOneByCampaignId(campaignId: string): Promise<IVoteCommentEntity | undefined> {
        return await this._repository.findOne({ where: { campaign_id: campaignId } });
    }

    public async findOneByEmotionId(emotionId: string): Promise<IVoteCommentEntity | undefined> {
        return await this._repository.findOne({ where: { emotion_id: emotionId } });
    }

    public async findOneByUserId(userId: string): Promise<IVoteCommentEntity | undefined> {
        return await this._repository.findOne({ where: { user_id: userId } });
    }

    public async create(data: ICreateVoteCommentDTO): Promise<IVoteCommentEntity> {
        const { vote_id, message, user_id } = data;

        const voteCommentCreated = this._repository.create({ vote_id, user_id, message });

        await this._repository.save(voteCommentCreated);

        return voteCommentCreated;
    }

    public async save(voteComment: IVoteCommentEntity): Promise<IVoteCommentEntity> {
        await this._repository.save(voteComment);

        return voteComment;
    }

    public async delete(voteComment: IVoteCommentEntity): Promise<IVoteCommentEntity> {
        await this._repository.remove(voteComment);

        return voteComment;
    }

    public async list(): Promise<IVoteCommentEntity[]> {
        return await this._repository.find({
            relations: ['vote', 'user'],
        });
    }
}

export { VoteCommentPostgresRepository };
