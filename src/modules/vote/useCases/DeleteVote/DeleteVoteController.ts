import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { DeleteVoteService } from './DeleteVoteService';
import { generateStatus } from '@shared/helpers/status';

class DeleteVoteController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_id: userId, role } = req.auth;

        const voteId = req.params.id?.toString();

        const service = container.resolve(DeleteVoteService);

        const vote = await service.execute(voteId, userId, role);

        const statusCode = 202;

        const status = generateStatus(false, statusCode, 'Succesfully deleted vote!');

        const doc = classToClass(vote);

        return res.status(statusCode).json({ status, doc });
    }
}

export { DeleteVoteController };
