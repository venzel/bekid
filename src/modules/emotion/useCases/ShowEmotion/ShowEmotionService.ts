import { injectable, inject } from 'tsyringe';
import { IEmotionRepository } from '@modules/emotion/repositories/IEmotionRepository';
import { IEmotionEntity } from '@modules/emotion/models/entities/IEmotionEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class ShowEmotionService {
    constructor(@inject('EmotionRepository') private _emotionRepository: IEmotionRepository) {}

    public async execute(emotionId: string): Promise<IEmotionEntity> {
        const existsEmotion = await this._emotionRepository.findOneById(emotionId);

        if (!existsEmotion) {
            throw new AppException('Emotion not exists!', 404);
        }

        return existsEmotion;
    }
}

export { ShowEmotionService };
