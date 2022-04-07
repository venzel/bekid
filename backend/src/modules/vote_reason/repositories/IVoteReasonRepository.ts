import { IVoteReasonEntity } from '@modules/vote_reason/models/entities/IVoteReasonEntity';
import { ICreateVoteReasonDTO } from '@modules/vote_reason/dtos/ICreateVoteReasonDTO';

interface IVoteReasonRepository {
    findOneById(voteReasonId: string): Promise<IVoteReasonEntity | undefined>;

    create(data: ICreateVoteReasonDTO): Promise<IVoteReasonEntity>;

    save(voteReason: IVoteReasonEntity): Promise<IVoteReasonEntity>;

    delete(voteReason: IVoteReasonEntity): Promise<IVoteReasonEntity>;

    list(): Promise<IVoteReasonEntity[]>;
}

export { IVoteReasonRepository };
