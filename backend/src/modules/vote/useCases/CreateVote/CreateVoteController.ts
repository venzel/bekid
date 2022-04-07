import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ICreateVoteDTO } from '@modules/vote/dtos/ICreateVoteDTO';
import { CreateVoteService } from './CreateVoteService';
import { generateStatus } from '@shared/helpers/status';

class CreateVoteController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { campaign_id, emotion_id } = req.query;

        const { user_token_id } = req.auth;

        const service = container.resolve(CreateVoteService);

        const data = {
            user_token_id,
            campaign_id,
            emotion_id,
        } as ICreateVoteDTO; // important, force typing in this case: QUERY STRING!

        const vote = await service.execute(data);

        const statusCode = 201;

        const status = generateStatus(false, statusCode, 'Succesfully, vote created!');

        const doc = classToClass(vote);

        return res.status(statusCode).json({ status, doc });
    }
}

export { CreateVoteController };
