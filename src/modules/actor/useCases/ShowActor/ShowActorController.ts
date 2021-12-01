import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ShowActorService } from './ShowActorService';
import { generateStatus } from '@shared/helpers/status';

class ShowActorController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const actorId = req.params.id;

        const service = container.resolve(ShowActorService);

        const actor = await service.execute(actorId);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully, actor showed!');

        const doc = classToClass(actor);

        return res.status(statusCode).json({ status, doc });
    }
}

export { ShowActorController };
