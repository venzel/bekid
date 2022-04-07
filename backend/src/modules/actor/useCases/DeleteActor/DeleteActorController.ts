import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { DeleteActorService } from './DeleteActorService';
import { generateStatus } from '@shared/helpers/status';

class DeleteActorController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const actorId = req.params.id;

        const service = container.resolve(DeleteActorService);

        const actor = await service.execute(actorId);

        const status = generateStatus(false, 202, 'Succesfully, actor deleted!');

        const doc = classToClass(actor);

        return res.status(202).json({ status, doc });
    }
}

export { DeleteActorController };
