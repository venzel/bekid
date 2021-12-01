import { getRepository, Repository } from 'typeorm';

import { ICreateReasonDTO } from '@modules/reason/dtos/ICreateReasonDTO';
import { IReasonEntity } from '@modules/reason/models/entities/IReasonEntity';
import { ReasonPostgresEntity } from '../entities/ReasonPostgresEntity';
import { IReasonRepository } from '@modules/reason/repositories/IReasonRepository';

class ReasonPostgresRepository implements IReasonRepository {
    private _repository: Repository<IReasonEntity>;

    constructor() {
        this._repository = getRepository(ReasonPostgresEntity, 'default');
    }

    public async findOneById(reasonId: string): Promise<IReasonEntity | undefined> {
        return await this._repository.findOne({ where: { id: reasonId } });
    }

    public async findOneByName(name: string): Promise<IReasonEntity | undefined> {
        return await this._repository.findOne({ where: { name } });
    }

    public async create(data: ICreateReasonDTO): Promise<IReasonEntity> {
        const { emotion_id, description } = data;

        const reasonCreated = this._repository.create({ emotion_id, description });

        await this._repository.save(reasonCreated);

        return reasonCreated;
    }

    public async save(reason: IReasonEntity): Promise<IReasonEntity> {
        await this._repository.save(reason);

        return reason;
    }

    public async delete(reason: IReasonEntity): Promise<IReasonEntity> {
        await this._repository.remove(reason);

        return reason;
    }

    public async list(): Promise<IReasonEntity[]> {
        return await this._repository.find();
    }
}

export { ReasonPostgresRepository };
