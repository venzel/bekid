import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { IAddOneUserInGroupQueueDTO } from '@modules/group_queue/dtos/IAddOneUserInGroupQueueDTO';
import { AddOneUserInGroupQueueService } from './AddOneUserInGroupQueueService';
import { generateStatus } from '@shared/helpers/status';

class AddOneUserInGroupQueueController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_token_id } = req.auth;

        const { group_id, user_id } = req.query;

        const data = {
            user_token_id,
            group_id,
            user_id,
        } as IAddOneUserInGroupQueueDTO; // important, force typing in this case: QUERY STRING!

        const service = container.resolve(AddOneUserInGroupQueueService);

        const groupQueue = await service.execute(data);

        const statusCode = 201;

        const status = generateStatus(false, statusCode, 'Succesfully, group queue created!');

        const doc = classToClass(groupQueue);

        return res.status(statusCode).json({ status, doc });
    }
}

export { AddOneUserInGroupQueueController };
