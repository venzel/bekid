import { injectable, inject } from 'tsyringe';

import { IQuestionRepository } from '@modules/question/repositories/IQuestionRepository';
import { IQuestionEntity } from '@modules/question/models/entities/IQuestionEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class ShowQuestionService {
    constructor(@inject('QuestionRepository') private _questionRepository: IQuestionRepository) {}

    public async execute(questionId: string): Promise<IQuestionEntity> {
        const existsQuestion = await this._questionRepository.findOneById(questionId);

        if (!existsQuestion) {
            throw new AppException(`Question id ${questionId} not exists!`, 404);
        }

        return existsQuestion;
    }
}

export { ShowQuestionService };
