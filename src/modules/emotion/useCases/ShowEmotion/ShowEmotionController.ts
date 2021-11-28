import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ShowEmotionService } from './ShowEmotionService';
import { generateStatus } from '@shared/helpers/status';

class ShowEmotionController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const emotionId = req.params.id?.toString();

        const service = container.resolve(ShowEmotionService);

        const emotion = await service.execute(emotionId);

        const codeStatus = 200;

        const status = generateStatus(false, codeStatus, 'Succesfully showed emotion!');

        const doc = classToClass(emotion);

        return res.status(codeStatus).json({ status, doc });
    }
}

export { ShowEmotionController };
