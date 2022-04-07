import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { CreateReasonService } from './CreateReasonService';
import { generateStatus } from '@shared/helpers/status';

class CreateReasonController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { emotion_id, description } = req.body;

        const service = container.resolve(CreateReasonService);

        const data = {
            emotion_id,
            description,
        };

        const reason = await service.execute(data);

        const statusCode = 201;

        const status = generateStatus(false, statusCode, 'Succesfully, reason created!');

        const doc = classToClass(reason);

        return res.status(statusCode).json({ status, doc });
    }
}

export { CreateReasonController };
