import { injectable, inject } from 'tsyringe';
import { IVoteCommentEntity } from '@modules/vote_comment/models/entities/IVoteCommentEntity';
import { IVoteCommentRepository } from '@modules/vote_comment/repositories/IVoteCommentRepository';

@injectable()
class ListVoteCommentService {
    constructor(@inject('VoteCommentRepository') private _voteCommentRepository: IVoteCommentRepository) {}

    public async execute(): Promise<IVoteCommentEntity[]> {
        return await this._voteCommentRepository.list();
    }
}

export { ListVoteCommentService };
