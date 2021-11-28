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

        /* Exception estrategy guard */

        if (!existsEmotion) {
            throw new AppException(`Emotion id ${emotionId} not exists!`, 404);
        }

        /* Data delete in repository */

        await this._emotionRepository.delete(existsEmotion);

        /* Update id of emotion deleted */

        existsEmotion.id = emotionId;

        /* Return emotion deleted */

        return existsEmotion;
    }
}

export { DeleteEmotionService };
