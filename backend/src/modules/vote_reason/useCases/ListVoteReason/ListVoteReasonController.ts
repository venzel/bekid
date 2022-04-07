import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ListVoteReasonService } from './ListVoteReasonService';
import { generateStatus } from '@shared/helpers/status';

class ListVoteReasonController {
    public async handle(_: Request, res: Response): Promise<Response> {
        const service = container.resolve(ListVoteReasonService);

        const votesReasons = await service.execute();

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully, votes reasons listed!');

        const docs = classToClass(votesReasons);

        return res.status(statusCode).json({ status, docs });
    }
}

export { ListVoteReasonController };
