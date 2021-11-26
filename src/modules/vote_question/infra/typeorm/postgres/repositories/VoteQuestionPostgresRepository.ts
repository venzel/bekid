import { getRepository, Repository } from 'typeorm';
import { ICreateVoteQuestionDTO } from '@modules/vote_question/dtos/ICreateVoteQuestionDTO';
import { IVoteQuestionEntity } from '@modules/vote_question/models/entities/IVoteQuestionEntity';
import { VoteQuestionPostgresEntity } from '../entities/VoteQuestionPostgresEntity';
import { IVoteQuestionRepository } from '@modules/vote_question/repositories/IVoteQuestionRepository';

class VoteQuestionPostgresRepository implements IVoteQuestionRepository {
    private _repository: Repository<IVoteQuestionEntity>;

    constructor() {
        this._repository = getRepository(VoteQuestionPostgresEntity, 'default');
    }

    public async findOneById(vote_questionId: string): Promise<IVoteQuestionEntity | undefined> {
        return await this._repository.findOne({ where: { id: vote_questionId } });
    }

    public async findOneByCampaignId(campaignId: string): Promise<IVoteQuestionEntity | undefined> {
        return await this._repository.findOne({ where: { campaign_id: campaignId } });
    }

    public async findOneByEmotionId(emotionId: string): Promise<IVoteQuestionEntity | undefined> {
        return await this._repository.findOne({ where: { emotion_id: emotionId } });
    }

    public async findOneByUserId(userId: string): Promise<IVoteQuestionEntity | undefined> {
        return await this._repository.findOne({ where: { user_id: userId } });
    }

    public async create(data: ICreateVoteQuestionDTO): Promise<IVoteQuestionEntity> {
        const { vote_id, question_id, user_id } = data;

        const voteQuestionCreated = this._repository.create({ vote_id, question_id, user_id });

        await this._repository.save(voteQuestionCreated);

        return voteQuestionCreated;
    }

    public async save(voteQuestion: IVoteQuestionEntity): Promise<IVoteQuestionEntity> {
        await this._repository.save(voteQuestion);

        return voteQuestion;
    }

    public async delete(voteQuestion: IVoteQuestionEntity): Promise<IVoteQuestionEntity> {
        await this._repository.remove(voteQuestion);

        return voteQuestion;
    }

    public async list(): Promise<IVoteQuestionEntity[]> {
        return await this._repository.find({
            relations: ['vote', 'question', 'user'],
        });
    }
}

export { VoteQuestionPostgresRepository };
