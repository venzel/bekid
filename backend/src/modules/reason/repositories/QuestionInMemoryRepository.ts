import { v4 as uuid } from 'uuid';

import { ICreateReasonDTO } from '@modules/reason/dtos/ICreateReasonDTO';
import { IReasonEntity } from '@modules/reason/models/entities/IReasonEntity';
import { IReasonRepository } from '@modules/reason/repositories/IReasonRepository';
import { ReasonInMemoryEntity } from '../models/entities/ReasonInMemoryEntity';

class ReasonInMemoryRepository implements IReasonRepository {
    private _repository: IReasonEntity[];

    constructor() {
        this._repository = [];
    }

    public async findOneById(reasonId: string): Promise<IReasonEntity | undefined> {
        return this._repository.find((data) => data.id === reasonId);
    }

    public async create(data: ICreateReasonDTO): Promise<IReasonEntity> {
        const { emotion_id, description } = data;

        const reasonInMemoryEntity = new ReasonInMemoryEntity();

        const id = uuid();

        Object.assign(reasonInMemoryEntity, { id, emotion_id, description });

        this._repository.push(reasonInMemoryEntity);

        return reasonInMemoryEntity;
    }

    public async save(reason: IReasonEntity): Promise<IReasonEntity> {
        const reasonIndex: number = this._repository.indexOf(reason);

        if (reasonIndex !== -1) {
            this._repository[reasonIndex] = reason;
        }

        return reason;
    }

    public async delete(reason: IReasonEntity): Promise<IReasonEntity> {
        const reasonIndex: number = this._repository.indexOf(reason);

        if (reasonIndex !== -1) {
            this._repository.splice(reasonIndex, 1);
        }

        return reason;
    }

    public async list(): Promise<IReasonEntity[]> {
        return this._repository;
    }
}

export { ReasonInMemoryRepository };
