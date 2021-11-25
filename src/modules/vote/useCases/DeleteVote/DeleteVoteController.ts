import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { DeleteVoteService } from './DeleteVoteService';
import { generateStatus } from '@shared/helpers/status';

class DeleteVoteController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const voteId = req.params.id?.toString();

        const service = container.resolve(DeleteVoteService);

        const vote = await service.execute(voteId);

        const status = generateStatus(false, 200, 'Succesfully deleted vote!');

        const doc = classToClass(vote);

        return res.status(200).json({ status, doc });
    }
}

export { DeleteVoteController };
