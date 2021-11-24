import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { CreateQuestionService } from './CreateQuestionService';
import { generateStatus } from '@shared/helpers/status';

class CreateQuestionController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { description } = req.body;

        const service = container.resolve(CreateQuestionService);

        const question = await service.handle({ description });

        const status = generateStatus(false, 201, 'Succesfully created question!');

        const doc = classToClass(question);

        return res.status(201).json({ status, doc });
    }
}

export { CreateQuestionController };
