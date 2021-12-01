import { injectable, inject } from 'tsyringe';

import { IVoteActorEntity } from '@modules/vote_actor/models/entities/IVoteActorEntity';
import { IVoteActorRepository } from '@modules/vote_actor/repositories/IVoteActorRepository';

@injectable()
class ListVoteActorService {
    constructor(@inject('VoteActorRepository') private _voteActorRepository: IVoteActorRepository) {}

    public async execute(): Promise<IVoteActorEntity[]> {
        return await this._voteActorRepository.list();
    }
}

export { ListVoteActorService };
