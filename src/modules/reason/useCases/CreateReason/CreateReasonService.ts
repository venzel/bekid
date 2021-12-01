import { injectable, inject } from 'tsyringe';

import { IReasonEntity } from '@modules/reason/models/entities/IReasonEntity';
import { IReasonRepository } from '@modules/reason/repositories/IReasonRepository';
import { ICreateReasonDTO } from '@modules/reason/dtos/ICreateReasonDTO';
import { IEmotionRepository } from '@modules/emotion/repositories/IEmotionRepository';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class CreateReasonService {
    constructor(
        @inject('ReasonRepository') private _reasonRepository: IReasonRepository,
        @inject('EmotionRepository') private _emotionRepository: IEmotionRepository
    ) {}

    public async execute(data: ICreateReasonDTO): Promise<IReasonEntity> {
        /* Destructuring object */

        const { emotion_id, description } = data;

        /* Find emotion by id */

        const existsEmotion = await this._emotionRepository.findOneById(emotion_id);

        /* Strategy guard */

        if (!existsEmotion) {
            throw new AppException(`Emotion with id ${emotion_id} not found!`, 404);
        }

        /* Create reason */

        const reasonCreated = await this._reasonRepository.create({ emotion_id, description });

        /* Return the reason created */

        return reasonCreated;
    }
}

export { CreateReasonService };
