import { v4 as uuid } from 'uuid';

import { ICreateQuestionDTO } from '@modules/question/dtos/ICreateQuestionDTO';
import { IQuestionEntity } from '@modules/question/models/entities/IQuestionEntity';
import { IQuestionRepository } from '@modules/question/repositories/IQuestionRepository';
import { QuestionInMemoryEntity } from '../models/entities/QuestionInMemoryEntity';

class QuestionInMemoryRepository implements IQuestionRepository {
    private _repository: IQuestionEntity[];

    constructor() {
        this._repository = [];
    }

    public async findOneById(questionId: string): Promise<IQuestionEntity | undefined> {
        return this._repository.find((data) => data.id === questionId);
    }

    public async create(data: ICreateQuestionDTO): Promise<IQuestionEntity> {
        const { emotion_id, description } = data;

        const questionInMemoryEntity = new QuestionInMemoryEntity();

        const id = uuid();

        Object.assign(questionInMemoryEntity, { id, emotion_id, description });

        this._repository.push(questionInMemoryEntity);

        return questionInMemoryEntity;
    }

    public async save(question: IQuestionEntity): Promise<IQuestionEntity> {
        const questionIndex: number = this._repository.indexOf(question);

        if (questionIndex !== -1) {
            this._repository[questionIndex] = question;
        }

        return question;
    }

    public async delete(question: IQuestionEntity): Promise<IQuestionEntity> {
        const questionIndex: number = this._repository.indexOf(question);

        if (questionIndex !== -1) {
            this._repository.splice(questionIndex, 1);
        }

        return question;
    }

    public async list(): Promise<IQuestionEntity[]> {
        return this._repository;
    }
}

export { QuestionInMemoryRepository };
