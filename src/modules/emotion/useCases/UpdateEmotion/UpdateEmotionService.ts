import { injectable, inject } from 'tsyringe';
import { IEmotionRepository } from '@modules/emotion/repositories/IEmotionRepository';
import { IUpdateEmotionDTO } from './IUpdateEmotionDTO';
import { IEmotionEntity } from '@modules/emotion/models/entities/IEmotionEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class UpdateEmotionService {
    constructor(@inject('EmotionRepository') private _emotionRepository: IEmotionRepository) {}

    public async execute(emotionId: string, data: IUpdateEmotionDTO): Promise<IEmotionEntity> {
        const { name, slug, description } = data;

        /* Find emotion by id */

        const existsEmotionWithId = await this._emotionRepository.findOneById(emotionId);

        /* Exception estrategy guard */

        if (!existsEmotionWithId) {
            throw new AppException('Emotion not found!', 404);
        }

        /* Exception estrategy guard */

        if (existsEmotionWithId.name === name) {
            throw new AppException('It is not allowed to change to the same name!', 400);
        }

        /* Find emotion by name */

        const existsEmotionWithName = await this._emotionRepository.findOneByName(name);

        /* Exception estrategy guard */

        if (existsEmotionWithName) {
            throw new AppException('Emotion already exists in found!', 404);
        }

        /* Data update */

        existsEmotionWithId.name = name;

        existsEmotionWithId.slug = slug;

        existsEmotionWithId.description = description;

        /* Data saved in repository */

        const updatedEmotion = await this._emotionRepository.save(existsEmotionWithId);

        /* Returns the emotion found */

        return updatedEmotion;
    }
}

export { UpdateEmotionService };
