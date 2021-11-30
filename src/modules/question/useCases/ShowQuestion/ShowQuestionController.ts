import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ShowQuestionService } from './ShowQuestionService';
import { generateStatus } from '@shared/helpers/status';

class ShowQuestionController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const questionId = req.params.id;

        const service = container.resolve(ShowQuestionService);

        const question = await service.execute(questionId);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully, question showed!');

        const doc = classToClass(question);

        return res.status(statusCode).json({ status, doc });
    }
}

export { ShowQuestionController };
