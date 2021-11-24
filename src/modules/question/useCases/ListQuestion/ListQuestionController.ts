import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { ListQuestionService } from './ListQuestionService';
import { generateStatus } from '@shared/helpers/status';

class ListQuestionController {
    public async handle(_: Request, res: Response): Promise<Response> {
        const service = container.resolve(ListQuestionService);

        const questions = await service.execute();

        const status = generateStatus(false, 201, 'Succesfully listed questions!');

        const docs = classToClass(questions);

        return res.status(201).json({ status, docs });
    }
}

export { ListQuestionController };
