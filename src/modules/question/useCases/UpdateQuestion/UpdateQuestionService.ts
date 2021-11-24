import { injectable, inject } from 'tsyringe';
import { IQuestionRepository } from '@modules/question/repositories/IQuestionRepository';
import { IUpdateQuestionDTO } from '../../dtos/IUpdateQuestionDTO';
import { IQuestionEntity } from '@modules/question/models/entities/IQuestionEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class UpdateQuestionService {
    constructor(@inject('QuestionRepository') private _questionRepository: IQuestionRepository) {}

    public async execute(questionId: string, data: IUpdateQuestionDTO): Promise<IQuestionEntity> {
        const { description } = data;

        /* Find question by id */

        const existsQuestionWithId = await this._questionRepository.findOneById(questionId);

        /* Exception estrategy guard */

        if (!existsQuestionWithId) {
            throw new AppException('Question not found!', 404);
        }

        /* Data update */

        existsQuestionWithId.description = description;

        /* Data saved in repository */

        const updatedQuestion = await this._questionRepository.save(existsQuestionWithId);

        /* Returns the question found */

        return updatedQuestion;
    }
}

export { UpdateQuestionService };
