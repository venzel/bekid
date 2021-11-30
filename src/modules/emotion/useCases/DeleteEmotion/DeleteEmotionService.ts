import { injectable, inject } from 'tsyringe';

import { IEmotionRepository } from '@modules/emotion/repositories/IEmotionRepository';
import { IEmotionEntity } from '@modules/emotion/models/entities/IEmotionEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class DeleteEmotionService {
    constructor(@inject('EmotionRepository') private _emotionRepository: IEmotionRepository) {}

    public async execute(emotionId: string): Promise<IEmotionEntity> {
        /* Find by emotion id */

        const existsEmotion = await this._emotionRepository.findOneById(emotionId);

        /* Strategy guard */

        if (!existsEmotion) {
            throw new AppException(`Emotion id ${emotionId} not found!`, 404);
        }

        /* Data delete in repository */

        await this._emotionRepository.delete(existsEmotion);

        /* Set emotion id in object */

        existsEmotion.id = emotionId;

        /* Return emotion deleted */

        return existsEmotion;
    }
}

export { DeleteEmotionService };
