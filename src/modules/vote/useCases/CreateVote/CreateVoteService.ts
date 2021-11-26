import { injectable, inject } from 'tsyringe';
import { IVoteEntity } from '@modules/vote/models/entities/IVoteEntity';
import { IVoteRepository } from '@modules/vote/repositories/IVoteRepository';
import { ICreateVoteDTO } from '@modules/vote/dtos/ICreateVoteDTO';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class CreateVoteService {
    constructor(@inject('VoteRepository') private _voteRepository: IVoteRepository) {}

    public async handle(data: ICreateVoteDTO): Promise<IVoteEntity> {
        const { campaign_id, emotion_id, user_id } = data;

        /* Create vote */

        const createdVote = await this._voteRepository.create({ campaign_id, emotion_id, user_id });

        /* Return the vote created */

        return createdVote;
    }
}

export { CreateVoteService };
