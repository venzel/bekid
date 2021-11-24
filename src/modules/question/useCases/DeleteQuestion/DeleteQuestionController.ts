import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { DeleteQuestionService } from './DeleteQuestionService';
import { generateStatus } from '@shared/helpers/status';

class DeleteQuestionController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const questionId = req.params.id?.toString();

        const service = container.resolve(DeleteQuestionService);

        const question = await service.execute(questionId);

        const status = generateStatus(false, 200, 'Succesfully deleted question!');

        const doc = classToClass(question);

        return res.status(200).json({ status, doc });
    }
}

export { DeleteQuestionController };
