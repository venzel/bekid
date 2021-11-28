import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { DeleteQuestionService } from './DeleteQuestionService';
import { generateStatus } from '@shared/helpers/status';

class DeleteQuestionController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const questionId = req.params.id?.toString();

        const service = container.resolve(DeleteQuestionService);

        const question = await service.execute(questionId);

        const statusCode = 202;

        const status = generateStatus(false, statusCode, 'Succesfully deleted question!');

        const doc = classToClass(question);

        return res.status(statusCode).json({ status, doc });
    }
}

export { DeleteQuestionController };
