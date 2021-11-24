import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { ShowQuestionService } from './ShowQuestionService';
import { generateStatus } from '@shared/helpers/status';

class ShowQuestionController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const questionId = req.params.id?.toString();

        const service = container.resolve(ShowQuestionService);

        const question = await service.execute(questionId);

        const status = generateStatus(false, 200, 'Succesfully showed question!');

        const doc = classToClass(question);

        return res.status(200).json({ status, doc });
    }
}

export { ShowQuestionController };
