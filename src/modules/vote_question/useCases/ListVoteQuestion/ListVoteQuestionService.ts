import { injectable, inject } from 'tsyringe';
import { IVoteQuestionEntity } from '@modules/vote_question/models/entities/IVoteQuestionEntity';
import { IVoteQuestionRepository } from '@modules/vote_question/repositories/IVoteQuestionRepository';

@injectable()
class ListVoteQuestionService {
    constructor(@inject('VoteQuestionRepository') private _voteQuestionRepository: IVoteQuestionRepository) {}

    public async execute(): Promise<IVoteQuestionEntity[]> {
        return await this._voteQuestionRepository.list();
    }
}

export { ListVoteQuestionService };
