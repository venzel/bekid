import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { CreateVoteCommentService } from './CreateVoteCommentService';
import { generateStatus } from '@shared/helpers/status';

class CreateVoteCommentController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { vote_id, message: mesage_ } = req.body;

        const voteId = String(vote_id);

        const message = String(mesage_);

        const userId = req.auth.user_id;

        const service = container.resolve(CreateVoteCommentService);

        const voteComment = await service.handle({ vote_id: voteId, user_id: userId, message: message });

        const status = generateStatus(false, 201, 'Succesfully created vote question!');

        const doc = classToClass(voteComment);

        return res.status(201).json({ status, doc });
    }
}

export { CreateVoteCommentController };