import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { ListVoteService } from './ListVoteService';
import { generateStatus } from '@shared/helpers/status';

class ListVoteController {
    public async handle(_: Request, res: Response): Promise<Response> {
        const service = container.resolve(ListVoteService);

        const votes = await service.execute();

        const status = generateStatus(false, 201, 'Succesfully listed votes!');

        const docs = classToClass(votes);

        return res.status(201).json({ status, docs });
    }
}

export { ListVoteController };
