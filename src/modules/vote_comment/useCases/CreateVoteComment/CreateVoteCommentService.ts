import { injectable, inject } from 'tsyringe';

import { IVoteCommentEntity } from '@modules/vote_comment/models/entities/IVoteCommentEntity';
import { IVoteCommentRepository } from '@modules/vote_comment/repositories/IVoteCommentRepository';
import { ICreateVoteCommentDTO } from '@modules/vote_comment/dtos/ICreateVoteCommentDTO';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class CreateVoteCommentService {
    constructor(@inject('VoteCommentRepository') private _voteCommentRepository: IVoteCommentRepository) {}

    public async handle(data: ICreateVoteCommentDTO): Promise<IVoteCommentEntity> {
        const { vote_id, user_id, message } = data;

        /* Create vote comment */

        const createdVoteComment = await this._voteCommentRepository.create({ vote_id, message, user_id });

        /* Return the vote_comment created */

        return createdVoteComment;
    }
}

export { CreateVoteCommentService };
