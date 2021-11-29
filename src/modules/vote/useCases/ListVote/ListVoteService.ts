import { injectable, inject } from 'tsyringe';

import { IVoteEntity } from '@modules/vote/models/entities/IVoteEntity';
import { IVoteRepository } from '@modules/vote/repositories/IVoteRepository';

@injectable()
class ListVoteService {
    constructor(@inject('VoteRepository') private _voteRepository: IVoteRepository) {}

    public async execute(userId: string, role: string): Promise<IVoteEntity[]> {
        if (role === 'ADMIN') {
            return await this._voteRepository.list();
        }

        return await this._voteRepository.listAllByUserId(userId);
    }
}

export { ListVoteService };
