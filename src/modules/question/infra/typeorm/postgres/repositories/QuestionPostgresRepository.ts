import { getRepository, Repository } from 'typeorm';
import { ICreateQuestionDTO } from '@modules/question/dtos/ICreateQuestionDTO';
import { IQuestionEntity } from '@modules/question/models/entities/IQuestionEntity';
import { QuestionPostgresEntity } from '../entities/QuestionPostgresEntity';
import { IQuestionRepository } from '@modules/question/repositories/IQuestionRepository';

class QuestionPostgresRepository implements IQuestionRepository {
    private _repository: Repository<IQuestionEntity>;

    constructor() {
        this._repository = getRepository(QuestionPostgresEntity, 'default');
    }

    public async findOneById(questionId: string): Promise<IQuestionEntity | undefined> {
        return await this._repository.findOne({ where: { id: questionId } });
    }

    public async findOneByName(name: string): Promise<IQuestionEntity | undefined> {
        return await this._repository.findOne({ where: { name } });
    }

    public async create(data: ICreateQuestionDTO): Promise<IQuestionEntity> {
        const { description } = data;

        const questionCreated = this._repository.create({ description });

        await this._repository.save(questionCreated);

        return questionCreated;
    }

    public async save(question: IQuestionEntity): Promise<IQuestionEntity> {
        await this._repository.save(question);

        return question;
    }

    public async delete(question: IQuestionEntity): Promise<IQuestionEntity> {
        await this._repository.remove(question);

        return question;
    }

    public async list(): Promise<IQuestionEntity[]> {
        return await this._repository.find();
    }
}

export { QuestionPostgresRepository };
