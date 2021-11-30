import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ListEmotionService } from './ListEmotionService';
import { generateStatus } from '@shared/helpers/status';

class ListEmotionController {
    public async handle(_: Request, res: Response): Promise<Response> {
        const service = container.resolve(ListEmotionService);

        const emotions = await service.execute();

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully listed emotions!');

        const docs = classToClass(emotions);

        return res.status(statusCode).json({ status, docs });
    }
}

export { ListEmotionController };
