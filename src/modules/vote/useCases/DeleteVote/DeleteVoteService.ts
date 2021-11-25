import { injectable, inject } from 'tsyringe';
import { IVoteRepository } from '@modules/vote/repositories/IVoteRepository';
import { IVoteEntity } from '@modules/vote/models/entities/IVoteEntity';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class DeleteVoteService {
    constructor(@inject('VoteRepository') private _voteRepository: IVoteRepository) {}

    public async execute(voteId: string): Promise<IVoteEntity> {
        /* Find by vote id */

        const existsVote = await this._voteRepository.findOneById(voteId);

        /* Exception estrategy guard */

        if (!existsVote) {
            throw new AppException('Vote not exists!', 404);
        }

        /* Data delete (update) in repository */

        await this._voteRepository.delete(existsVote);

        /* Returns the vote found */

        return existsVote;
    }
}

export { DeleteVoteService };
