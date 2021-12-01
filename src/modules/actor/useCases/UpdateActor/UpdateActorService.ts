import { injectable, inject } from 'tsyringe';

import { IActorRepository } from '@modules/actor/repositories/IActorRepository';
import { IUpdateActorDTO } from '../../dtos/IUpdateActorDTO';
import { IActorEntity } from '@modules/actor/models/entities/IActorEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class UpdateActorService {
    constructor(@inject('ActorRepository') private _actorRepository: IActorRepository) {}

    public async execute(data: IUpdateActorDTO): Promise<IActorEntity> {
        /* Destructuring object */

        const { actor_id, name, slug } = data;

        /* Find actor by id */

        const existsActor = await this._actorRepository.findOneById(actor_id);

        /* Strategy guard */

        if (!existsActor) {
            throw new AppException(`Actor with id ${actor_id} not found!`, 404);
        }

        /* Strategy guard */

        if (existsActor.name === name) {
            throw new AppException('It is not allowed to change to the same name!', 400);
        }

        /* Find actor by name */

        const existsActorWithName = await this._actorRepository.findOneByName(name);

        /* Strategy guard */

        if (existsActorWithName) {
            const { id, name } = existsActorWithName;

            const payload = { id, name };

            throw new AppException('Actor already exists in found!', 400, payload);
        }

        /* Data update */

        existsActor.name = name;

        existsActor.slug = slug;

        /* Save actor in repository */

        const actorUpdated = await this._actorRepository.save(existsActor);

        /* Returns actor found */

        return actorUpdated;
    }
}

export { UpdateActorService };
