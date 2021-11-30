import { injectable, inject } from 'tsyringe';
import { IEmotionRepository } from '@modules/emotion/repositories/IEmotionRepository';
import { IEmotionEntity } from '@modules/emotion/models/entities/IEmotionEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class ShowEmotionService {
    constructor(@inject('EmotionRepository') private _emotionRepository: IEmotionRepository) {}

    public async execute(emotionId: string): Promise<IEmotionEntity> {
        /* Find emotion by id*/

        const existsEmotion = await this._emotionRepository.findOneById(emotionId);

        /* Strategy guard */

        if (!existsEmotion) {
            throw new AppException(`Emotion id ${emotionId} not found!`, 404);
        }

        /* Return emotion found */

        return existsEmotion;
    }
}

export { ShowEmotionService };
