import { injectable, inject } from 'tsyringe';
import { IQuestionEntity } from '@modules/question/models/entities/IQuestionEntity';
import { IQuestionRepository } from '@modules/question/repositories/IQuestionRepository';
import { IGenerateIdProvider } from '@shared/providers/generateIdProvider/model/IGenerateIdProvider';
import { ICreateQuestionDTO } from '@modules/question/dtos/ICreateQuestionDTO';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class CreateQuestionService {
    constructor(
        @inject('QuestionRepository') private _questionRepository: IQuestionRepository,
        @inject('GenerateIdProvider') private _generateIdProvider: IGenerateIdProvider
    ) {}

    public async handle(data: ICreateQuestionDTO): Promise<IQuestionEntity> {
        const { description } = data;

        /* Generate question id provider */

        const generateQuestionId = this._generateIdProvider.generateId();

        /* End generate question id provider */

        const createdQuestion = await this._questionRepository.create({ question_id: generateQuestionId, description });

        /* Return the question created */

        return createdQuestion;
    }
}

export { CreateQuestionService };
