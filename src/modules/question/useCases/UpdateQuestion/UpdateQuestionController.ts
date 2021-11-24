import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { UpdateQuestionService } from './UpdateQuestionService';
import { generateStatus } from '@shared/helpers/status';

class UpdateQuestionController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { description } = req.body;

        const questionId = req.params.id?.toString();

        const service = container.resolve(UpdateQuestionService);

        const question = await service.execute(questionId, { description });

        const status = generateStatus(false, 201, 'Succesfully updated question!');

        const doc = classToClass(question);

        return res.status(200).json({ status, doc });
    }
}

export { UpdateQuestionController };
