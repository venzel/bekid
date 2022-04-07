import { injectable, inject, container } from 'tsyringe';

import { IVoteEntity } from '@modules/vote/models/entities/IVoteEntity';
import { IVoteRepository } from '@modules/vote/repositories/IVoteRepository';
import { ICreateVoteDTO } from '@modules/vote/dtos/ICreateVoteDTO';
import { DeleteCampaignQueueService } from '@modules/campaign_queue/useCases/DeleteCampaignQueue/DeleteCampaignQueueService';

@injectable()
class CreateVoteService {
    constructor(@inject('VoteRepository') private _voteRepository: IVoteRepository) {}

    public async execute(data: ICreateVoteDTO): Promise<IVoteEntity> {
        /* Destructuring object */

        const { user_token_id, campaign_id, emotion_id } = data;

        /* Vote */

        const vote = {
            campaign_id,
            emotion_id,
            user_token_id,
        };

        /* Create vote in repository */

        const voteCreated = await this._voteRepository.create(vote);

        /* Execute logic, delete in queue */

        const deleteCampaignQueueService = container.resolve(DeleteCampaignQueueService);

        /* Delete campaign queue in service */

        await deleteCampaignQueueService.execute(campaign_id, user_token_id);

        /* Return vote created */

        return voteCreated;
    }
}

export { CreateVoteService };
