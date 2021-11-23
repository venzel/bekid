import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { DeleteEmotionService } from './DeleteEmotionService';
import { generateStatus } from '@shared/helpers/status';

class DeleteEmotionController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const emotionId = req.params.id?.toString();

        const service = container.resolve(DeleteEmotionService);

        const emotion = await service.execute(emotionId);

        const status = generateStatus(false, 200, 'Succesfully deleted emotion!');

        const doc = classToClass(emotion);

        return res.status(200).json({ status, doc });
    }
}

export { DeleteEmotionController };
