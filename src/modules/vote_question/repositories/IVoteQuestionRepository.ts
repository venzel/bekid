import { IVoteQuestionEntity } from '@modules/vote_question/models/entities/IVoteQuestionEntity';
import { ICreateVoteQuestionDTO } from '@modules/vote_question/dtos/ICreateVoteQuestionDTO';

interface IVoteQuestionRepository {
    findOneById(voteQuestionId: string): Promise<IVoteQuestionEntity | undefined>;

    create(data: ICreateVoteQuestionDTO): Promise<IVoteQuestionEntity>;

    save(voteQuestion: IVoteQuestionEntity): Promise<IVoteQuestionEntity>;

    delete(voteQuestion: IVoteQuestionEntity): Promise<IVoteQuestionEntity>;

    list(): Promise<IVoteQuestionEntity[]>;
}

export { IVoteQuestionRepository };
