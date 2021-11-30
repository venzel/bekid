import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { CreateEmotionService } from './CreateEmotionService';
import { generateStatus } from '@shared/helpers/status';

class CreateEmotionController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { name, slug } = req.body;

        const service = container.resolve(CreateEmotionService);

        const data = {
            name,
            slug,
        };

        const emotion = await service.execute(data);

        const statusCode = 201;

        const status = generateStatus(false, statusCode, 'Succesfully, emotion created!');

        const doc = classToClass(emotion);

        return res.status(statusCode).json({ status, doc });
    }
}

export { CreateEmotionController };
