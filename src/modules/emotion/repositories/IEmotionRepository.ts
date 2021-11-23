import { IEmotionEntity } from '@modules/emotion/models/entities/IEmotionEntity';
import { ICreateEmotionDTO } from '../useCases/CreateEmotion/ICreateEmotionDTO';

interface IEmotionRepository {
    findOneById(emotionId: string): Promise<IEmotionEntity | undefined>;

    findOneByName(name: string): Promise<IEmotionEntity | undefined>;

    create(data: ICreateEmotionDTO): Promise<IEmotionEntity>;

    save(emotion: IEmotionEntity): Promise<IEmotionEntity>;

    delete(emotion: IEmotionEntity): Promise<IEmotionEntity>;

    list(): Promise<IEmotionEntity[]>;
}

export { IEmotionRepository };
