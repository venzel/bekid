import { injectable, inject } from 'tsyringe';

import { ICreateVoteCommentDTO } from '@modules/vote_comment/dtos/ICreateVoteCommentDTO';
import { IVoteCommentEntity } from '@modules/vote_comment/models/entities/IVoteCommentEntity';
import { IVoteCommentRepository } from '@modules/vote_comment/repositories/IVoteCommentRepository';
import { IVoteRepository } from '@modules/vote/repositories/IVoteRepository';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class CreateVoteCommentService {
    constructor(
        @inject('VoteCommentRepository') private _voteCommentRepository: IVoteCommentRepository,
        @inject('VoteRepository') private _voteRepository: IVoteRepository
    ) {}

    public async execute(data: ICreateVoteCommentDTO): Promise<IVoteCommentEntity> {
        /* Destructuring object */

        const { user_token_id, vote_id, message } = data;

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

        /* Vote comment */

        const voteComment = {
            user_token_id,
            vote_id,
            message,
        };

        /* Create vote comment */

        const voteCommentCreated = await this._voteCommentRepository.create(voteComment);

        /* Return vote comment created */

        return voteCommentCreated;
    }
}

export { CreateVoteCommentService };
