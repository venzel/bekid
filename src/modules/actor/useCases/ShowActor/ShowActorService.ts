import { injectable, inject } from 'tsyringe';
import { IActorRepository } from '@modules/actor/repositories/IActorRepository';
import { IActorEntity } from '@modules/actor/models/entities/IActorEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class ShowActorService {
    constructor(@inject('ActorRepository') private _actorRepository: IActorRepository) {}

    public async execute(actorId: string): Promise<IActorEntity> {
        /* Find actor by id*/

        const existsActor = await this._actorRepository.findOneById(actorId);

        /* Strategy guard */

        if (!existsActor) {
            throw new AppException(`Actor id ${actorId} not found!`, 404);
        }

        /* Return actor found */

        return existsActor;
    }
}

export { ShowActorService };
