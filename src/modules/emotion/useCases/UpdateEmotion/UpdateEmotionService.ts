import { injectable, inject } from 'tsyringe';

import { IEmotionRepository } from '@modules/emotion/repositories/IEmotionRepository';
import { IUpdateEmotionDTO } from '../../dtos/IUpdateEmotionDTO';
import { IEmotionEntity } from '@modules/emotion/models/entities/IEmotionEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class UpdateEmotionService {
    constructor(@inject('EmotionRepository') private _emotionRepository: IEmotionRepository) {}

    public async execute(emotionId: string, data: IUpdateEmotionDTO): Promise<IEmotionEntity> {
        const { name, slug } = data;

        /* Find emotion by id */

        const existsEmotionWithId = await this._emotionRepository.findOneById(emotionId);

        /* Strategy guard */

        if (!existsEmotionWithId) {
            throw new AppException(`Emotion id ${emotionId} not exists!`, 404);
        }

        /* Strategy guard */

        if (existsEmotionWithId.name === name) {
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

        existsEmotionWithId.name = name;

        existsEmotionWithId.slug = slug;

        /* Data saved in repository */

        const updatedEmotion = await this._emotionRepository.save(existsEmotionWithId);

        /* Returns the emotion found */

        return updatedEmotion;
    }
}

export { UpdateEmotionService };
