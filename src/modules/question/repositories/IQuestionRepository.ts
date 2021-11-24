import { IQuestionEntity } from '@modules/question/models/entities/IQuestionEntity';
import { ICreateQuestionDTO } from '@modules/question/dtos/ICreateQuestionDTO';

interface IQuestionRepository {
    findOneById(questionId: string): Promise<IQuestionEntity | undefined>;

    create(data: ICreateQuestionDTO): Promise<IQuestionEntity>;

    save(question: IQuestionEntity): Promise<IQuestionEntity>;

    delete(question: IQuestionEntity): Promise<IQuestionEntity>;

    list(): Promise<IQuestionEntity[]>;
}

export { IQuestionRepository };
