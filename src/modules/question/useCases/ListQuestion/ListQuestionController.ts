import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ListQuestionService } from './ListQuestionService';
import { generateStatus } from '@shared/helpers/status';

class ListQuestionController {
    public async handle(_: Request, res: Response): Promise<Response> {
        const service = container.resolve(ListQuestionService);

        const questions = await service.execute();

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully listed questions!');

        const docs = classToClass(questions);

        return res.status(statusCode).json({ status, docs });
    }
}

export { ListQuestionController };
