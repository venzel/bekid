import { IVoteEntity } from '@modules/vote/models/entities/IVoteEntity';
import { ICreateVoteDTO } from '@modules/vote/dtos/ICreateVoteDTO';

interface IVoteRepository {
    /* FIND */

    findOneById(voteId: string): Promise<IVoteEntity | undefined>;

    findOneByCampaignId(campaignId: string): Promise<IVoteEntity | undefined>;

    findOneByEmotionId(emotionId: string): Promise<IVoteEntity | undefined>;

    findOneByUserId(userId: string): Promise<IVoteEntity | undefined>;

    /* CREATE */

    create(data: ICreateVoteDTO): Promise<IVoteEntity>;

    /* SAVE */

    save(vote: IVoteEntity): Promise<IVoteEntity>;

    /* DELETE */

    delete(vote: IVoteEntity): Promise<IVoteEntity>;

    /* LIST */

    listAllByUserId(userId: string): Promise<IVoteEntity[]>;

    list(): Promise<IVoteEntity[]>;
}

export { IVoteRepository };
