import { getRepository, Repository } from 'typeorm';

import { ICreateActorDTO } from '@modules/actor/dtos/ICreateActorDTO';
import { IActorEntity } from '@modules/actor/models/entities/IActorEntity';
import { ActorPostgresEntity } from '../entities/ActorPostgresEntity';
import { IActorRepository } from '@modules/actor/repositories/IActorRepository';

class ActorPostgresRepository implements IActorRepository {
    private _repository: Repository<IActorEntity>;

    constructor() {
        this._repository = getRepository(ActorPostgresEntity, 'default');
    }

    public async findOneById(actorId: string): Promise<IActorEntity | undefined> {
        return await this._repository.findOne({ where: { id: actorId } });
    }

    public async findOneByName(name: string): Promise<IActorEntity | undefined> {
        return await this._repository.findOne({ where: { name } });
    }

    public async create(data: ICreateActorDTO): Promise<IActorEntity> {
        const { name, slug } = data;

        const actorCreated = this._repository.create({ name, slug });

        await this._repository.save(actorCreated);

        return actorCreated;
    }

    public async save(actor: IActorEntity): Promise<IActorEntity> {
        await this._repository.save(actor);

        return actor;
    }

    public async delete(actor: IActorEntity): Promise<IActorEntity> {
        await this._repository.remove(actor);

        return actor;
    }

    public async list(): Promise<IActorEntity[]> {
        return await this._repository.find();
    }
}

export { ActorPostgresRepository };
