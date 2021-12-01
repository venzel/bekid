import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ListActorService } from './ListActorService';
import { generateStatus } from '@shared/helpers/status';

class ListActorController {
    public async handle(_: Request, res: Response): Promise<Response> {
        const service = container.resolve(ListActorService);

        const actors = await service.execute();

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully, actors listed!');

        const docs = classToClass(actors);

        return res.status(statusCode).json({ status, docs });
    }
}

export { ListActorController };
