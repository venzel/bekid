import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ListVoteService } from './ListVoteService';
import { generateStatus } from '@shared/helpers/status';

class ListVoteController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_token_id } = req.auth;

        const service = container.resolve(ListVoteService);

        const votes = await service.execute(user_token_id);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully, votes listed!');

        const docs = classToClass(votes);

        return res.status(statusCode).json({ status, docs });
    }
}

export { ListVoteController };
