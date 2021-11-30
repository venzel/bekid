import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { CreateVoteCommentService } from './CreateVoteCommentService';
import { generateStatus } from '@shared/helpers/status';

class CreateVoteCommentController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_token_id } = req.auth;

        const { vote_id, message } = req.body;

        const service = container.resolve(CreateVoteCommentService);

        const data = {
            user_token_id,
            vote_id,
            message,
        };

        const voteComment = await service.execute(data);

        const statusCode = 201;

        const status = generateStatus(false, statusCode, 'Succesfully, vote comment created!');

        const doc = classToClass(voteComment);

        return res.status(statusCode).json({ status, doc });
    }
}

export { CreateVoteCommentController };
