import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { CreateVoteQuestionService } from './CreateVoteQuestionService';
import { generateStatus } from '@shared/helpers/status';

class CreateVoteQuestionController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { vote_id, question_id } = req.query;

        const voteId = String(vote_id);

        const questionId = String(question_id);

        const userId = req.auth.user_id;

        const service = container.resolve(CreateVoteQuestionService);

        const voteQuestion = await service.handle({ vote_id: voteId, question_id: questionId, user_id: userId });

        const status = generateStatus(false, 201, 'Succesfully created vote question!');

        const doc = classToClass(voteQuestion);

        return res.status(201).json({ status, doc });
    }
}

export { CreateVoteQuestionController };
