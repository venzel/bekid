import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { CreateQuestionService } from './CreateQuestionService';
import { generateStatus } from '@shared/helpers/status';

class CreateQuestionController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { emotion_id, description } = req.body;

        const service = container.resolve(CreateQuestionService);

        const data = {
            emotion_id,
            description,
        };

        const question = await service.execute(data);

        const statusCode = 201;

        const status = generateStatus(false, statusCode, 'Succesfully, question created!');

        const doc = classToClass(question);

        return res.status(statusCode).json({ status, doc });
    }
}

export { CreateQuestionController };
