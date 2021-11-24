import { v4 as uuid } from 'uuid';
import { ICreateEmotionDTO } from '@modules/emotion/dtos/ICreateEmotionDTO';
import { IEmotionEntity } from '@modules/emotion/models/entities/IEmotionEntity';
import { IEmotionRepository } from '@modules/emotion/repositories/IEmotionRepository';
import { EmotionInMemoryEntity } from '../models/entities/EmotionInMemoryEntity';

class FakeEmotionRepository implements IEmotionRepository {
    private _repository: IEmotionEntity[];

    constructor() {
        this._repository = [];
    }

    public async findOneById(emotion_id: string): Promise<IEmotionEntity | undefined> {
        return this._repository.find((data) => data.id === emotion_id);
    }

    public async findOneByName(name: string): Promise<IEmotionEntity | undefined> {
        return this._repository.find((data) => data.name === name);
    }

    public async create(data: ICreateEmotionDTO): Promise<IEmotionEntity> {
        const { name, slug, description } = data;

        const emotionInMemoryEntity = new EmotionInMemoryEntity();

        const id = uuid();

        Object.assign(emotionInMemoryEntity, { id, name, slug, description });

        this._repository.push(emotionInMemoryEntity);

        return emotionInMemoryEntity;
    }

    public async save(emotion: IEmotionEntity): Promise<IEmotionEntity> {
        const emotionIndex: number = this._repository.indexOf(emotion);

        if (emotionIndex !== -1) {
            this._repository[emotionIndex] = emotion;
        }

        return emotion;
    }

    public async delete(emotion: IEmotionEntity): Promise<IEmotionEntity> {
        const emotionIndex: number = this._repository.indexOf(emotion);

        if (emotionIndex !== -1) {
            this._repository.splice(emotionIndex, 1);
        }

        return emotion;
    }

    public async list(): Promise<IEmotionEntity[]> {
        return this._repository;
    }
}

export { FakeEmotionRepository };
