import { v4 as uuid } from 'uuid';

import { ICreateVoteQuestionDTO } from '@modules/vote_question/dtos/ICreateVoteQuestionDTO';
import { IVoteQuestionEntity } from '@modules/vote_question/models/entities/IVoteQuestionEntity';
import { IVoteQuestionRepository } from '@modules/vote_question/repositories/IVoteQuestionRepository';
import { VoteQuestionInMemoryEntity } from '../models/entities/VoteQuestionInMemoryEntity';

class VoteQuestionInMemoryRepository implements IVoteQuestionRepository {
    private _repository: IVoteQuestionEntity[];

    constructor() {
        this._repository = [];
    }

    public async findOneById(voteQuestionId: string): Promise<IVoteQuestionEntity | undefined> {
        return this._repository.find((data) => data.id === voteQuestionId);
    }

    public async create(data: ICreateVoteQuestionDTO): Promise<IVoteQuestionEntity> {
        const { vote_id, question_id, user_token_id } = data;

        const voteQuestionInMemoryEntity = new VoteQuestionInMemoryEntity();

        const id = uuid();

        Object.assign(voteQuestionInMemoryEntity, { id, vote_id, question_id, user_id: user_token_id });

        this._repository.push(voteQuestionInMemoryEntity);

        return voteQuestionInMemoryEntity;
    }

    public async save(vote_question: IVoteQuestionEntity): Promise<IVoteQuestionEntity> {
        const vote_questionIndex: number = this._repository.indexOf(vote_question);

        if (vote_questionIndex !== -1) {
            this._repository[vote_questionIndex] = vote_question;
        }

        return vote_question;
    }

    public async delete(vote_question: IVoteQuestionEntity): Promise<IVoteQuestionEntity> {
        const vote_questionIndex: number = this._repository.indexOf(vote_question);

        if (vote_questionIndex !== -1) {
            this._repository.splice(vote_questionIndex, 1);
        }

        return vote_question;
    }

    public async list(): Promise<IVoteQuestionEntity[]> {
        return this._repository;
    }
}

export { VoteQuestionInMemoryRepository };
