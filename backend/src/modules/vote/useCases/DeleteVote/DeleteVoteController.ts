import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { IDeleteVoteDTO } from '@modules/vote/dtos/IDeleteVoteDTO';
import { DeleteVoteService } from './DeleteVoteService';
import { generateStatus } from '@shared/helpers/status';

class DeleteVoteController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_token_id, user_token_role } = req.auth;

        const vote_id = req.params.id;

        const service = container.resolve(DeleteVoteService);

        const data = {
            user_token_id,
            user_token_role,
            vote_id,
        } as IDeleteVoteDTO; // important, force typing in this case: QUERY STRING!

        const vote = await service.execute(data);

        const statusCode = 202;

        const status = generateStatus(false, statusCode, 'Succesfully, vote deleted!');

        const doc = classToClass(vote);

        return res.status(statusCode).json({ status, doc });
    }
}

export { DeleteVoteController };
