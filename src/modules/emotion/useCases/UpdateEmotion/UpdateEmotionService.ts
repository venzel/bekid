import { injectable, inject } from 'tsyringe';

import { IEmotionRepository } from '@modules/emotion/repositories/IEmotionRepository';
import { IUpdateEmotionDTO } from '../../dtos/IUpdateEmotionDTO';
import { IEmotionEntity } from '@modules/emotion/models/entities/IEmotionEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class UpdateEmotionService {
    constructor(@inject('EmotionRepository') private _emotionRepository: IEmotionRepository) {}

    public async execute(data: IUpdateEmotionDTO): Promise<IEmotionEntity> {
        /* Destructuring object */

        const { emotion_id, name, slug } = data;

        /* Find emotion by id */

        const existsEmotion = await this._emotionRepository.findOneById(emotion_id);

        /* Strategy guard */

        if (!existsEmotion) {
            throw new AppException(`Emotion with id ${emotion_id} not found!`, 404);
        }

        /* Strategy guard */

        if (existsEmotion.name === name) {
            throw new AppException('It is not allowed to change to the same name!', 400);
        }

        /* Find emotion by name */

        const existsEmotionWithName = await this._emotionRepository.findOneByName(name);

        /* Strategy guard */

        if (existsEmotionWithName) {
            const { id, name } = existsEmotionWithName;

            const payload = { id, name };

            throw new AppException('Emotion already exists in found!', 400, payload);
        }

        /* Data update */

        existsEmotion.name = name;

        existsEmotion.slug = slug;

        /* Save emotion in repository */

        const emotionUpdated = await this._emotionRepository.save(existsEmotion);

        /* Returns emotion found */

        return emotionUpdated;
    }
}

export { UpdateEmotionService };
