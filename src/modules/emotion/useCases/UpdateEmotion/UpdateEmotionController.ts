import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { UpdateEmotionService } from './UpdateEmotionService';
import { generateStatus } from '@shared/helpers/status';

class UpdateEmotionController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { name, slug } = req.body;

        const emotionId = req.params.id?.toString();

        const service = container.resolve(UpdateEmotionService);

        const emotion = await service.execute(emotionId, { name, slug });

        const status = generateStatus(false, 201, 'Succesfully updated emotion!');

        const doc = classToClass(emotion);

        return res.status(200).json({ status, doc });
    }
}

export { UpdateEmotionController };
