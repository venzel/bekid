import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { ListVoteCommentService } from './ListVoteCommentService';
import { generateStatus } from '@shared/helpers/status';

class ListVoteCommentController {
    public async handle(_: Request, res: Response): Promise<Response> {
        const service = container.resolve(ListVoteCommentService);

        const votesComments = await service.execute();

        const status = generateStatus(false, 201, 'Succesfully listed votes comments!');

        const docs = classToClass(votesComments);

        return res.status(201).json({ status, docs });
    }
}

export { ListVoteCommentController };
