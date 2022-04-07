import { injectable, inject } from 'tsyringe';

import { IVoteReasonEntity } from '@modules/vote_reason/models/entities/IVoteReasonEntity';
import { IVoteReasonRepository } from '@modules/vote_reason/repositories/IVoteReasonRepository';

@injectable()
class ListVoteReasonService {
    constructor(@inject('VoteReasonRepository') private _voteReasonRepository: IVoteReasonRepository) {}

    public async execute(): Promise<IVoteReasonEntity[]> {
        return await this._voteReasonRepository.list();
    }
}

export { ListVoteReasonService };
