import { IVoteCommentEntity } from '@modules/vote_comment/models/entities/IVoteCommentEntity';
import { ICreateVoteCommentDTO } from '@modules/vote_comment/dtos/ICreateVoteCommentDTO';

interface IVoteCommentRepository {
    findOneById(voteCommentId: string): Promise<IVoteCommentEntity | undefined>;

    create(data: ICreateVoteCommentDTO): Promise<IVoteCommentEntity>;

    save(voteComment: IVoteCommentEntity): Promise<IVoteCommentEntity>;

    delete(voteComment: IVoteCommentEntity): Promise<IVoteCommentEntity>;

    list(): Promise<IVoteCommentEntity[]>;
}

export { IVoteCommentRepository };
