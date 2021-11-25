import { injectable, inject } from 'tsyringe';
import { IVoteEntity } from '@modules/vote/models/entities/IVoteEntity';
import { IVoteRepository } from '@modules/vote/repositories/IVoteRepository';
import { IGenerateIdProvider } from '@shared/providers/generateIdProvider/model/IGenerateIdProvider';
import { ICreateVoteDTO } from '@modules/vote/dtos/ICreateVoteDTO';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class CreateVoteService {
    constructor(
        @inject('VoteRepository') private _voteRepository: IVoteRepository,
        @inject('GenerateIdProvider') private _generateIdProvider: IGenerateIdProvider
    ) {}

    public async handle(data: ICreateVoteDTO): Promise<IVoteEntity> {
        const { campaign_id, emotion_id, user_id } = data;

        /* Generate vote id provider */

        const generateVoteId = this._generateIdProvider.generateId();

        /* End generate vote id provider */

        const createdVote = await this._voteRepository.create({
            vote_id: generateVoteId,
            campaign_id,
            emotion_id,
            user_id,
        });

        /* Return the vote created */

        return createdVote;
    }
}

export { CreateVoteService };
