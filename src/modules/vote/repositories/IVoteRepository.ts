import { IVoteEntity } from '@modules/vote/models/entities/IVoteEntity';
import { ICreateVoteDTO } from '@modules/vote/dtos/ICreateVoteDTO';

interface IVoteRepository {
    findOneById(voteId: string): Promise<IVoteEntity | undefined>;

    findOneByCampaignId(campaignId: string): Promise<IVoteEntity | undefined>;

    findOneByEmotionId(emotionId: string): Promise<IVoteEntity | undefined>;

    findOneByUserId(userId: string): Promise<IVoteEntity | undefined>;

    create(data: ICreateVoteDTO): Promise<IVoteEntity>;

    save(vote: IVoteEntity): Promise<IVoteEntity>;

    delete(vote: IVoteEntity): Promise<IVoteEntity>;

    list(): Promise<IVoteEntity[]>;
}

export { IVoteRepository };
