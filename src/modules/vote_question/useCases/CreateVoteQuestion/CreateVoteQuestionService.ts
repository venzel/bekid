import { injectable, inject } from 'tsyringe';

import { IVoteQuestionEntity } from '@modules/vote_question/models/entities/IVoteQuestionEntity';
import { IVoteQuestionRepository } from '@modules/vote_question/repositories/IVoteQuestionRepository';
import { IVoteRepository } from '@modules/vote/repositories/IVoteRepository';
import { ICreateVoteQuestionDTO } from '@modules/vote_question/dtos/ICreateVoteQuestionDTO';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class CreateVoteQuestionService {
    constructor(
        @inject('VoteQuestionRepository') private _voteQuestionRepository: IVoteQuestionRepository,
        @inject('VoteRepository') private _voteRepository: IVoteRepository
    ) {}

    public async execute(data: ICreateVoteQuestionDTO): Promise<IVoteQuestionEntity> {
        /* Destructuring object */

        const { user_token_id, vote_id, question_id } = data;

        /* Find vote by id */

        const existsVote = await this._voteRepository.findOneById(vote_id);

        /* Strategy guard */

        if (!existsVote) {
            throw new AppException(`Vote with id ${vote_id} not found!`, 404);
        }

        /* Check authority */

        if (existsVote.user_id !== user_token_id) {
            throw new AppException(`It is not possible to use a vote of another user!`, 401);
        }

        /* Vote question */

        const voteQuestion = {
            user_token_id,
            vote_id,
            question_id,
        };

        /* Create vote question in repository */

        const voteQuestionCreated = await this._voteQuestionRepository.create(voteQuestion);

        /* Return vote question created */

        return voteQuestionCreated;
    }
}

export { CreateVoteQuestionService };
