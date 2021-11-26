import { getRepository, Repository } from 'typeorm';
import { ICreateEmotionDTO } from '@modules/emotion/dtos/ICreateEmotionDTO';
import { IEmotionEntity } from '@modules/emotion/models/entities/IEmotionEntity';
import { EmotionPostgresEntity } from '../entities/EmotionPostgresEntity';
import { IEmotionRepository } from '@modules/emotion/repositories/IEmotionRepository';

class EmotionPostgresRepository implements IEmotionRepository {
    private _repository: Repository<IEmotionEntity>;

    constructor() {
        this._repository = getRepository(EmotionPostgresEntity, 'default');
    }

    public async findOneById(emotionId: string): Promise<IEmotionEntity | undefined> {
        return await this._repository.findOne({ where: { id: emotionId } });
    }

    public async findOneByName(name: string): Promise<IEmotionEntity | undefined> {
        return await this._repository.findOne({ where: { name } });
    }

    public async create(data: ICreateEmotionDTO): Promise<IEmotionEntity> {
        const { name, slug, description } = data;

        const emotionCreated = this._repository.create({ name, slug, description });

        await this._repository.save(emotionCreated);

        return emotionCreated;
    }

    public async save(emotion: IEmotionEntity): Promise<IEmotionEntity> {
        await this._repository.save(emotion);

        return emotion;
    }

    public async delete(emotion: IEmotionEntity): Promise<IEmotionEntity> {
        await this._repository.remove(emotion);

        return emotion;
    }

    public async list(): Promise<IEmotionEntity[]> {
        return await this._repository.find();
    }
}

export { EmotionPostgresRepository };
