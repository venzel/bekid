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

    public async findOneById(question_id: string): Promise<IQuestionEntity | undefined> {
        return this._repository.find((data) => data.id === question_id);
    }

    public async create(data: ICreateQuestionDTO): Promise<IQuestionEntity> {
        const { description } = data;

        const questionInMemory = new QuestionInMemoryEntity();

        const id = uuid();

        Object.assign(questionInMemory, { id, description });

        this._repository.push(questionInMemory);

        return questionInMemory;
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
