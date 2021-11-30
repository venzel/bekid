import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ICreateVoteQuestionDTO } from '@modules/vote_question/dtos/ICreateVoteQuestionDTO';
import { CreateVoteQuestionService } from './CreateVoteQuestionService';
import { generateStatus } from '@shared/helpers/status';

class CreateVoteQuestionController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_token_id } = req.auth;

        const { vote_id, question_id } = req.query;

        const service = container.resolve(CreateVoteQuestionService);

        const data = {
            user_token_id,
            vote_id,
            question_id,
        } as ICreateVoteQuestionDTO; // important, force typing in this case: QUERY STRING!

        const voteQuestion = await service.execute(data);

        const statusCode = 201;

        const status = generateStatus(false, statusCode, 'Succesfully, vote question created!');

        const doc = classToClass(voteQuestion);

        return res.status(statusCode).json({ status, doc });
    }
}

export { CreateVoteQuestionController };
