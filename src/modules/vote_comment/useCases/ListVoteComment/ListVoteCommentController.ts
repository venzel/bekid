import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ListVoteCommentService } from './ListVoteCommentService';
import { generateStatus } from '@shared/helpers/status';

class ListVoteCommentController {
    public async handle(_: Request, res: Response): Promise<Response> {
        const service = container.resolve(ListVoteCommentService);

        const votesComments = await service.execute();

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully listed votes comments!');

        const docs = classToClass(votesComments);

        return res.status(statusCode).json({ status, docs });
    }
}

export { ListVoteCommentController };
