import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ICreateVoteActorDTO } from '@modules/vote_actor/dtos/ICreateVoteActorDTO';
import { CreateVoteActorService } from './CreateVoteActorService';
import { generateStatus } from '@shared/helpers/status';

class CreateVoteActorController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_token_id } = req.auth;

        const { vote_id, actor_id } = req.query;

        const service = container.resolve(CreateVoteActorService);

        const data = {
            user_token_id,
            vote_id,
            actor_id,
        } as ICreateVoteActorDTO; // important, force typing in this case: QUERY STRING!

        const voteActor = await service.execute(data);

        const statusCode = 201;

        const status = generateStatus(false, statusCode, 'Succesfully, vote actor created!');

        const doc = classToClass(voteActor);

        return res.status(statusCode).json({ status, doc });
    }
}

export { CreateVoteActorController };
