import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ICreateVoteReasonDTO } from '@modules/vote_reason/dtos/ICreateVoteReasonDTO';
import { CreateVoteReasonService } from './CreateVoteReasonService';
import { generateStatus } from '@shared/helpers/status';

class CreateVoteReasonController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_token_id } = req.auth;

        const { vote_id, reason_id } = req.query;

        const service = container.resolve(CreateVoteReasonService);

        const data = {
            user_token_id,
            vote_id,
            reason_id,
        } as ICreateVoteReasonDTO; // important, force typing in this case: QUERY STRING!

        const voteReason = await service.execute(data);

        const statusCode = 201;

        const status = generateStatus(false, statusCode, 'Succesfully, vote reason created!');

        const doc = classToClass(voteReason);

        return res.status(statusCode).json({ status, doc });
    }
}

export { CreateVoteReasonController };
