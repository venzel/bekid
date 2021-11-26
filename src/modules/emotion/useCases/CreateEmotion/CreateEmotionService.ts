import { injectable, inject } from 'tsyringe';
import { IEmotionEntity } from '@modules/emotion/models/entities/IEmotionEntity';
import { IEmotionRepository } from '@modules/emotion/repositories/IEmotionRepository';
import { ICreateEmotionDTO } from '@modules/emotion/dtos/ICreateEmotionDTO';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class CreateEmotionService {
    constructor(@inject('EmotionRepository') private _emotionRepository: IEmotionRepository) {}

    public async handle(data: ICreateEmotionDTO): Promise<IEmotionEntity> {
        const { name, slug, description } = data;

        /* Find emotion by name */

        const existsEmotion = await this._emotionRepository.findOneByName(name);

        /* Exception estrategy guard */

        if (existsEmotion) {
            throw new AppException('Emotion already exists!', 400);
        }

        /* End generate emotion id provider */

        const createdEmotion = await this._emotionRepository.create({ slug, name, description });

        /* Return the emotion created */

        return createdEmotion;
    }
}

export { CreateEmotionService };
