import { injectable, inject, container } from 'tsyringe';

import { IVoteRepository } from '@modules/vote/repositories/IVoteRepository';
import { IVoteEntity } from '@modules/vote/models/entities/IVoteEntity';
import { AppException } from '@shared/exceptions/AppException';
import { CreateCampaignQueueService } from '@modules/campaign_queue/useCases/CreateCampaignQueue/CreateCampaignQueueService';

@injectable()
class DeleteVoteService {
    constructor(@inject('VoteRepository') private _voteRepository: IVoteRepository) {}

    public async execute(voteId: string, userId: string, role: string): Promise<IVoteEntity> {
        /* Find by vote id */

        const existsVote = await this._voteRepository.findOneById(voteId);

        /* Exception estrategy guard */

        if (!existsVote) {
            throw new AppException('Vote not exists!', 404);
        }

        /* Descructuring object */

        const { campaign_id, user_id } = existsVote;

        /* The group manager arrives */

        if (role !== 'ADMIN' && user_id !== userId) {
            throw new AppException('It is not possible to delete a vote from another user!', 401);
        }

        /* Data delete (update) in repository */

        await this._voteRepository.delete(existsVote);

        /* */

        const createCampaignQueueService = container.resolve(CreateCampaignQueueService);

        /* Create again campaing queuer  */

        await createCampaignQueueService.execute(campaign_id, user_id);

        /* Returns the vote found */

        return existsVote;
    }
}

export { DeleteVoteService };
