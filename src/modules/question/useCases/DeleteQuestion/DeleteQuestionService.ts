import { injectable, inject } from 'tsyringe';

import { IQuestionRepository } from '@modules/question/repositories/IQuestionRepository';
import { IQuestionEntity } from '@modules/question/models/entities/IQuestionEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class DeleteQuestionService {
    constructor(@inject('QuestionRepository') private _questionRepository: IQuestionRepository) {}

    public async execute(questionId: string): Promise<IQuestionEntity> {
        /* Find by question id */

        const existsQuestion = await this._questionRepository.findOneById(questionId);

        /* Strategy guard */

        if (!existsQuestion) {
            throw new AppException(`Question with id ${questionId} not found`, 404);
        }

        /* Data delete in repository */

        await this._questionRepository.delete(existsQuestion);

        /* Set group id in object */

        existsQuestion.id = questionId;

        /* Returns question found */

        return existsQuestion;
    }
}

export { DeleteQuestionService };
