import { injectable, inject } from 'tsyringe';
import { IEmotionEntity } from '@modules/emotion/models/entities/IEmotionEntity';
import { IEmotionRepository } from '@modules/emotion/repositories/IEmotionRepository';
import { IGenerateIdProvider } from '@shared/providers/generateIdProvider/model/IGenerateIdProvider';
import { ICreateEmotionDTO } from '@modules/emotion/dtos/ICreateEmotionDTO';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class CreateEmotionService {
    constructor(
        @inject('EmotionRepository') private _emotionRepository: IEmotionRepository,
        @inject('GenerateIdProvider') private _generateIdProvider: IGenerateIdProvider
    ) {}

    public async handle(data: ICreateEmotionDTO): Promise<IEmotionEntity> {
        const { name, slug, description } = data;

        /* Find emotion by name */

        const existsEmotion = await this._emotionRepository.findOneByName(name);

        /* Exception estrategy guard */

        if (existsEmotion) {
            throw new AppException('Emotion already exists!', 400);
        }

        /* Generate emotion id provider */

        const generateEmotionId = this._generateIdProvider.generateId();

        /* End generate emotion id provider */

        const createdEmotion = await this._emotionRepository.create({
            emotion_id: generateEmotionId,
            slug,
            name,
            description,
        });

        /* Return the emotion created */

        return createdEmotion;
    }
}

export { CreateEmotionService };
