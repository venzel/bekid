import { injectable, inject } from 'tsyringe';

import { IVoteActorEntity } from '@modules/vote_actor/models/entities/IVoteActorEntity';
import { IVoteActorRepository } from '@modules/vote_actor/repositories/IVoteActorRepository';
import { IVoteRepository } from '@modules/vote/repositories/IVoteRepository';
import { ICreateVoteActorDTO } from '@modules/vote_actor/dtos/ICreateVoteActorDTO';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class CreateVoteActorService {
    constructor(
        @inject('VoteActorRepository') private _voteActorRepository: IVoteActorRepository,
        @inject('VoteRepository') private _voteRepository: IVoteRepository
    ) {}

    public async execute(data: ICreateVoteActorDTO): Promise<IVoteActorEntity> {
        /* Destructuring object */

        const { user_token_id, vote_id, actor_id } = data;

        /* Find vote by id */

        const existsVote = await this._voteRepository.findOneById(vote_id);

        /* Strategy guard */

        if (!existsVote) {
            throw new AppException(`Vote with id ${vote_id} not found!`, 404);
        }

        /* Check authority */

        if (existsVote.user_id !== user_token_id) {
            throw new AppException(`It is not possible to use a vote of another user!`, 401);
        }

        /* Vote actor */

        const voteActor = {
            user_token_id,
            vote_id,
            actor_id,
        };

        /* Create vote actor in repository */

        const voteActorCreated = await this._voteActorRepository.create(voteActor);

        /* Return vote actor created */

        return voteActorCreated;
    }
}

export { CreateVoteActorService };
