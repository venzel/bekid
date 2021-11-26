import { injectable, inject } from 'tsyringe';
import { IQuestionEntity } from '@modules/question/models/entities/IQuestionEntity';
import { IQuestionRepository } from '@modules/question/repositories/IQuestionRepository';
import { ICreateQuestionDTO } from '@modules/question/dtos/ICreateQuestionDTO';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class CreateQuestionService {
    constructor(@inject('QuestionRepository') private _questionRepository: IQuestionRepository) {}

    public async handle(data: ICreateQuestionDTO): Promise<IQuestionEntity> {
        const { description } = data;

        /* Create question */

        const createdQuestion = await this._questionRepository.create({ description });

        /* Return the question created */

        return createdQuestion;
    }
}

export { CreateQuestionService };
