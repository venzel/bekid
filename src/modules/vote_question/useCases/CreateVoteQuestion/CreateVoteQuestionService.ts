import { injectable, inject } from 'tsyringe';

import { IVoteQuestionEntity } from '@modules/vote_question/models/entities/IVoteQuestionEntity';
import { IVoteQuestionRepository } from '@modules/vote_question/repositories/IVoteQuestionRepository';
import { ICreateVoteQuestionDTO } from '@modules/vote_question/dtos/ICreateVoteQuestionDTO';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class CreateVoteQuestionService {
    constructor(@inject('VoteQuestionRepository') private _voteQuestionRepository: IVoteQuestionRepository) {}

    public async handle(data: ICreateVoteQuestionDTO): Promise<IVoteQuestionEntity> {
        const { vote_id, question_id, user_id } = data;

        /* Create vote question */

        const createdVoteQuestion = await this._voteQuestionRepository.create({ vote_id, question_id, user_id });

        /* Return the vote_question created */

        return createdVoteQuestion;
    }
}

export { CreateVoteQuestionService };
