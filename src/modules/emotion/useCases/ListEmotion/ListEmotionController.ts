import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { ListEmotionService } from './ListEmotionService';
import { generateStatus } from '@shared/helpers/status';

class ListEmotionController {
    public async handle(_: Request, res: Response): Promise<Response> {
        const service = container.resolve(ListEmotionService);

        const emotions = await service.execute();

        const status = generateStatus(false, 201, 'Succesfully listed emotions!');

        const docs = classToClass(emotions);

        return res.status(201).json({ status, docs });
    }
}

export { ListEmotionController };
