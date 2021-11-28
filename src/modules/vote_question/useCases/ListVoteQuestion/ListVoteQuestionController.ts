import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ListVoteQuestionService } from './ListVoteQuestionService';
import { generateStatus } from '@shared/helpers/status';

class ListVoteQuestionController {
    public async handle(_: Request, res: Response): Promise<Response> {
        const service = container.resolve(ListVoteQuestionService);

        const votesQuestions = await service.execute();

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully listed votes questions!');

        const docs = classToClass(votesQuestions);

        return res.status(statusCode).json({ status, docs });
    }
}

export { ListVoteQuestionController };
