import { injectable, inject } from 'tsyringe';

import { IActorEntity } from '@modules/actor/models/entities/IActorEntity';
import { IActorRepository } from '@modules/actor/repositories/IActorRepository';

@injectable()
class ListActorService {
    constructor(@inject('ActorRepository') private _actorRepository: IActorRepository) {}

    public async execute(): Promise<IActorEntity[]> {
        return await this._actorRepository.list();
    }
}

export { ListActorService };
