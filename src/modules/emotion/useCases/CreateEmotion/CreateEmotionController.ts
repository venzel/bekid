import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { CreateEmotionService } from './CreateEmotionService';
import { generateStatus } from '@shared/helpers/status';

class CreateEmotionController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { name, slug } = req.body;

        const service = container.resolve(CreateEmotionService);

        const emotion = await service.handle({ name, slug });

        const codeStatus = 201;

        const status = generateStatus(false, codeStatus, 'Succesfully created emotion!');

        const doc = classToClass(emotion);

        return res.status(codeStatus).json({ status, doc });
    }
}

export { CreateEmotionController };
