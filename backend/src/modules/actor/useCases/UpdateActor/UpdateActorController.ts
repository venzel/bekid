import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { UpdateActorService } from './UpdateActorService';
import { generateStatus } from '@shared/helpers/status';

class UpdateActorController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { actor_id, name, slug } = req.body;

        const service = container.resolve(UpdateActorService);

        const data = {
            actor_id,
            name,
            slug,
        };

        const actor = await service.execute(data);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully, actor updated!');

        const doc = classToClass(actor);

        return res.status(statusCode).json({ status, doc });
    }
}

export { UpdateActorController };
