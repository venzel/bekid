import { injectable, inject } from 'tsyringe';

import { IActorRepository } from '@modules/actor/repositories/IActorRepository';
import { IActorEntity } from '@modules/actor/models/entities/IActorEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class DeleteActorService {
    constructor(@inject('ActorRepository') private _actorRepository: IActorRepository) {}

    public async execute(actorId: string): Promise<IActorEntity> {
        /* Find by actor id */

        const existsActor = await this._actorRepository.findOneById(actorId);

        /* Strategy guard */

        if (!existsActor) {
            throw new AppException(`Actor id ${actorId} not found!`, 404);
        }

        /* Data delete in repository */

        await this._actorRepository.delete(existsActor);

        /* Set actor id in object */

        existsActor.id = actorId;

        /* Return actor found */

        return existsActor;
    }
}

export { DeleteActorService };
