import { injectable, inject } from 'tsyringe';
import { IEmotionEntity } from '@modules/emotion/models/entities/IEmotionEntity';
import { IEmotionRepository } from '@modules/emotion/repositories/IEmotionRepository';

@injectable()
class ListEmotionsService {
    constructor(@inject('EmotionRepository') private _emotionRepository: IEmotionRepository) {}

    public async execute(): Promise<IEmotionEntity[]> {
        return this._emotionRepository.list();
    }
}

export { ListEmotionsService };
