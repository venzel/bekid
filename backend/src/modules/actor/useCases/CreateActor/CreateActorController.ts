import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { CreateActorService } from './CreateActorService';
import { generateStatus } from '@shared/helpers/status';

class CreateActorController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { name, slug } = req.body;

        const service = container.resolve(CreateActorService);

        const data = {
            name,
            slug,
        };

        const actor = await service.execute(data);

        const statusCode = 201;

        const status = generateStatus(false, statusCode, 'Succesfully, actor created!');

        const doc = classToClass(actor);

        return res.status(statusCode).json({ status, doc });
    }
}

export { CreateActorController };
