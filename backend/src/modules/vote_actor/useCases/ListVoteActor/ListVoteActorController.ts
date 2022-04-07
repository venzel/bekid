import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ListVoteActorService } from './ListVoteActorService';
import { generateStatus } from '@shared/helpers/status';

class ListVoteActorController {
    public async handle(_: Request, res: Response): Promise<Response> {
        const service = container.resolve(ListVoteActorService);

        const votesActors = await service.execute();

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully, votes actors listed!');

        const docs = classToClass(votesActors);

        return res.status(statusCode).json({ status, docs });
    }
}

export { ListVoteActorController };
