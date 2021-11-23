import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { ListEmotionsService } from './ListEmotionsService';
import { generateStatus } from '@shared/helpers/status';

class ListEmotionsController {
    public async handle(_: Request, res: Response): Promise<Response> {
        const service = container.resolve(ListEmotionsService);

        const emotions = await service.execute();

        const status = generateStatus(false, 201, 'Succesfully listed emotions!');

        const docs = classToClass(emotions);

        return res.status(201).json({ status, docs });
    }
}

export { ListEmotionsController };
