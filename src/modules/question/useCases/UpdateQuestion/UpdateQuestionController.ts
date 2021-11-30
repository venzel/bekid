import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { UpdateQuestionService } from './UpdateQuestionService';
import { generateStatus } from '@shared/helpers/status';

class UpdateQuestionController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { question_id, description } = req.body;

        const service = container.resolve(UpdateQuestionService);

        const data = {
            question_id,
            description,
        };

        const question = await service.execute(data);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully, question updated!');

        const doc = classToClass(question);

        return res.status(statusCode).json({ status, doc });
    }
}

export { UpdateQuestionController };
