import { injectable, inject } from 'tsyringe';

import { IVoteReasonEntity } from '@modules/vote_reason/models/entities/IVoteReasonEntity';
import { IVoteReasonRepository } from '@modules/vote_reason/repositories/IVoteReasonRepository';
import { IVoteRepository } from '@modules/vote/repositories/IVoteRepository';
import { ICreateVoteReasonDTO } from '@modules/vote_reason/dtos/ICreateVoteReasonDTO';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class CreateVoteReasonService {
    constructor(
        @inject('VoteReasonRepository') private _voteReasonRepository: IVoteReasonRepository,
        @inject('VoteRepository') private _voteRepository: IVoteRepository
    ) {}

    public async execute(data: ICreateVoteReasonDTO): Promise<IVoteReasonEntity> {
        /* Destructuring object */

        const { user_token_id, vote_id, reason_id } = data;

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

        /* Vote reason */

        const voteReason = {
            user_token_id,
            vote_id,
            reason_id,
        };

        /* Create vote reason in repository */

        const voteReasonCreated = await this._voteReasonRepository.create(voteReason);

        /* Return vote reason created */

        return voteReasonCreated;
    }
}

export { CreateVoteReasonService };
