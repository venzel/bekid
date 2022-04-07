import { injectable, inject } from 'tsyringe';
import { IActorEntity } from '@modules/actor/models/entities/IActorEntity';
import { IActorRepository } from '@modules/actor/repositories/IActorRepository';
import { ICreateActorDTO } from '@modules/actor/dtos/ICreateActorDTO';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class CreateActorService {
    constructor(@inject('ActorRepository') private _actorRepository: IActorRepository) {}

    public async execute(data: ICreateActorDTO): Promise<IActorEntity> {
        /* Destructuring object */

        const { name, slug } = data;

        /* Find actor by name */

        const existsActor = await this._actorRepository.findOneByName(name);

        /* Strategy guard */

        if (existsActor) {
            const { id, name } = existsActor;

            const payload = { id, name };

            throw new AppException(`Actor already exists!`, 400, payload);
        }

        /* End generate actor id provider */

        const createdActor = await this._actorRepository.create({ slug, name });

        /* Return actor created */

        return createdActor;
    }
}

export { CreateActorService };
