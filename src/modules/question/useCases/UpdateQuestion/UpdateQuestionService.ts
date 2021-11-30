import { injectable, inject } from 'tsyringe';

import { IQuestionRepository } from '@modules/question/repositories/IQuestionRepository';
import { IUpdateQuestionDTO } from '../../dtos/IUpdateQuestionDTO';
import { IQuestionEntity } from '@modules/question/models/entities/IQuestionEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class UpdateQuestionService {
    constructor(@inject('QuestionRepository') private _questionRepository: IQuestionRepository) {}

    public async execute(data: IUpdateQuestionDTO): Promise<IQuestionEntity> {
        /* Destructuring object */

        const { question_id, description } = data;

        /* Find question by id */

        const existsQuestion = await this._questionRepository.findOneById(question_id);

        /* Strategy guard */

        if (!existsQuestion) {
            throw new AppException(`Question with id ${question_id} not found!`, 404);
        }

        /* Data update */

        existsQuestion.description = description;

        /* Data saved in repository */

        const updatedQuestion = await this._questionRepository.save(existsQuestion);

        /* Returns question found */

        return updatedQuestion;
    }
}

export { UpdateQuestionService };
