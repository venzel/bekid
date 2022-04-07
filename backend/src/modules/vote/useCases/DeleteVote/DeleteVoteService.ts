import { injectable, inject, container } from 'tsyringe';

import { IVoteRepository } from '@modules/vote/repositories/IVoteRepository';
import { IDeleteVoteDTO } from '@modules/vote/dtos/IDeleteVoteDTO';
import { IVoteEntity } from '@modules/vote/models/entities/IVoteEntity';
import { AppException } from '@shared/exceptions/AppException';
import { CreateCampaignQueueService } from '@modules/campaign_queue/useCases/CreateCampaignQueue/CreateCampaignQueueService';

@injectable()
class DeleteVoteService {
    constructor(@inject('VoteRepository') private _voteRepository: IVoteRepository) {}

    public async execute(data: IDeleteVoteDTO): Promise<IVoteEntity> {
        /* Destructuring object */

        const { user_token_id, user_token_role, vote_id } = data;

        /* Find vote by id */

        const existsVote = await this._voteRepository.findOneById(vote_id);

        /* Strategy guard */

        if (!existsVote) {
            throw new AppException('Vote not exists!', 404);
        }

        /* Descructuring object */

        const { campaign_id, user_id } = existsVote;

        /* The group manager arrives */

        if (user_token_role !== 'ADMIN' && user_id !== user_token_id) {
            throw new AppException('It is not possible to delete a vote from another user!', 401);
        }

        /* Data delete in repository */

        await this._voteRepository.delete(existsVote);

        /* Use service */

        const createCampaignQueueService = container.resolve(CreateCampaignQueueService);

        /* Create again campaing queuer  */

        await createCampaignQueueService.execute(campaign_id, user_id);

        /* Returns vote found */

        return existsVote;
    }
}

export { DeleteVoteService };
