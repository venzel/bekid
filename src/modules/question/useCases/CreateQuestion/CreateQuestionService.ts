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

    public async execute(data: ICreateQuestionDTO): Promise<IQuestionEntity> {
        /* Destructuring object */

        const { emotion_id, description } = data;

        /* Find emotion by id */

        const existsEmotion = await this._emotionRepository.findOneById(emotion_id);

        /* Strategy guard */

        if (!existsEmotion) {
            throw new AppException(`Emotion with id ${emotion_id} not found!`, 404);
        }

        /* Create question */

        const questionCreated = await this._questionRepository.create({ emotion_id, description });

        /* Return the question created */

        return questionCreated;
    }
}

export { CreateQuestionService };
