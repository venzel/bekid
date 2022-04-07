import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { UpdateEmotionService } from './UpdateEmotionService';
import { generateStatus } from '@shared/helpers/status';

class UpdateEmotionController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { emotion_id, name, slug } = req.body;

        const service = container.resolve(UpdateEmotionService);

        const data = {
            emotion_id,
            name,
            slug,
        };

        const emotion = await service.execute(data);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully, emotion updated!');

        const doc = classToClass(emotion);

        return res.status(statusCode).json({ status, doc });
    }
}

export { UpdateEmotionController };
