import { injectable, inject } from 'tsyringe';
import { IVoteQuestionEntity } from '@modules/vote_question/models/entities/IVoteQuestionEntity';
import { IVoteQuestionRepository } from '@modules/vote_question/repositories/IVoteQuestionRepository';
import { IGenerateIdProvider } from '@shared/providers/generateIdProvider/model/IGenerateIdProvider';
import { ICreateVoteQuestionDTO } from '@modules/vote_question/dtos/ICreateVoteQuestionDTO';
import { AppException } from '@shared/exceptions/AppException';

@injectable()
class CreateVoteQuestionService {
    constructor(
        @inject('VoteQuestionRepository') private _voteQuestionRepository: IVoteQuestionRepository,
        @inject('GenerateIdProvider') private _generateIdProvider: IGenerateIdProvider
    ) {}

    public async handle(data: ICreateVoteQuestionDTO): Promise<IVoteQuestionEntity> {
        const { vote_id, question_id, user_id } = data;

        /* Generate vote question id provider */

        const generateVoteQuestionId = this._generateIdProvider.generateId();

        /* End generate vote question id provider */

        const createdVoteQuestion = await this._voteQuestionRepository.create({
            vote_question_id: generateVoteQuestionId,
            vote_id,
            question_id,
            user_id,
        });

        /* Return the vote_question created */

        return createdVoteQuestion;
    }
}

export { CreateVoteQuestionService };
