import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { UpdateQuestionService } from './UpdateQuestionService';
import { generateStatus } from '@shared/helpers/status';

class UpdateQuestionController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { description } = req.body;

        const questionId = req.params.id?.toString();

        const service = container.resolve(UpdateQuestionService);

        const question = await service.execute(questionId, { description });

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully updated question!');

        const doc = classToClass(question);

        return res.status(statusCode).json({ status, doc });
    }
}

export { UpdateQuestionController };
