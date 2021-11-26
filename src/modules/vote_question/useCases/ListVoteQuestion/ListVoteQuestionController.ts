import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { ListVoteQuestionService } from './ListVoteQuestionService';
import { generateStatus } from '@shared/helpers/status';

class ListVoteQuestionController {
    public async handle(_: Request, res: Response): Promise<Response> {
        const service = container.resolve(ListVoteQuestionService);

        const votesQuestions = await service.execute();

        const status = generateStatus(false, 201, 'Succesfully listed votes questions!');

        const docs = classToClass(votesQuestions);

        return res.status(201).json({ status, docs });
    }
}

export { ListVoteQuestionController };
