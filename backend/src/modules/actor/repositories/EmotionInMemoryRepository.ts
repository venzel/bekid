import { v4 as uuid } from 'uuid';

import { ICreateActorDTO } from '@modules/actor/dtos/ICreateActorDTO';
import { IActorEntity } from '@modules/actor/models/entities/IActorEntity';
import { IActorRepository } from '@modules/actor/repositories/IActorRepository';
import { ActorInMemoryEntity } from '../models/entities/ActorInMemoryEntity';

class FakeActorRepository implements IActorRepository {
    private _repository: IActorEntity[];

    constructor() {
        this._repository = [];
    }

    public async findOneById(actorId: string): Promise<IActorEntity | undefined> {
        return this._repository.find((data) => data.id === actorId);
    }

    public async findOneByName(name: string): Promise<IActorEntity | undefined> {
        return this._repository.find((data) => data.name === name);
    }

    public async create(data: ICreateActorDTO): Promise<IActorEntity> {
        const { name, slug } = data;

        const actorInMemoryEntity = new ActorInMemoryEntity();

        const id = uuid();

        Object.assign(actorInMemoryEntity, { id, name, slug });

        this._repository.push(actorInMemoryEntity);

        return actorInMemoryEntity;
    }

    public async save(actor: IActorEntity): Promise<IActorEntity> {
        const actorIndex: number = this._repository.indexOf(actor);

        if (actorIndex !== -1) {
            this._repository[actorIndex] = actor;
        }

        return actor;
    }

    public async delete(actor: IActorEntity): Promise<IActorEntity> {
        const actorIndex: number = this._repository.indexOf(actor);

        if (actorIndex !== -1) {
            this._repository.splice(actorIndex, 1);
        }

        return actor;
    }

    public async list(): Promise<IActorEntity[]> {
        return this._repository;
    }
}

export { FakeActorRepository };
