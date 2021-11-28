import { injectable, inject } from 'tsyringe';

import { IQuestionEntity } from '@modules/question/models/entities/IQuestionEntity';
import { IQuestionRepository } from '@modules/question/repositories/IQuestionRepository';
import { ICreateQuestionDTO } from '@modules/question/dtos/ICreateQuestionDTO';
import { IEmotionRepository } from '@modules/emotion/repositories/IEmotionRepository';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class CreateQuestionService {
    constructor(
        @inject('QuestionRepository') private _questionRepository: IQuestionRepository,
        @inject('EmotionRepository') private _emotionRepository: IEmotionRepository
    ) {}

    public async handle(data: ICreateQuestionDTO): Promise<IQuestionEntity> {
        const { emotion_id, description } = data;

        /* Find emotion by id */

        const existsEmotion = await this._emotionRepository.findOneById(emotion_id);

        /* Exception estrategy guard */

        if (!existsEmotion) {
            throw new AppException(`Emotion id ${emotion_id} not found!`, 404);
        }

        /* Create question */

        const createdQuestion = await this._questionRepository.create({ emotion_id, description });

        /* Return the question created */

        return createdQuestion;
    }
}

export { CreateQuestionService };
