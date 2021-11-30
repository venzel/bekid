import { injectable, inject } from 'tsyringe';
import { IEmotionEntity } from '@modules/emotion/models/entities/IEmotionEntity';
import { IEmotionRepository } from '@modules/emotion/repositories/IEmotionRepository';
import { ICreateEmotionDTO } from '@modules/emotion/dtos/ICreateEmotionDTO';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class CreateEmotionService {
    constructor(@inject('EmotionRepository') private _emotionRepository: IEmotionRepository) {}

    public async execute(data: ICreateEmotionDTO): Promise<IEmotionEntity> {
        /* Destructuring object */

        const { name, slug } = data;

        /* Find emotion by name */

        const existsEmotion = await this._emotionRepository.findOneByName(name);

        /* Strategy guard */

        if (existsEmotion) {
            const { id, name } = existsEmotion;

            const payload = { id, name };

            throw new AppException(`Emotion already exists!`, 400, payload);
        }

        /* End generate emotion id provider */

        const createdEmotion = await this._emotionRepository.create({ slug, name });

        /* Return emotion created */

        return createdEmotion;
    }
}

export { CreateEmotionService };
