import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { IDeleteOneUserInGroupQueueDTO } from '@modules/group_queue/dtos/IDeleteOneUserInGroupQueueDTO';
import { DeleteOneUserInGroupQueueService } from './DeleteOneUserInGroupQueueService';
import { generateStatus } from '@shared/helpers/status';

class DeleteOneUserInGroupQueueController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_token_id } = req.auth;

        const group_queue_id = req.query.id;

        const service = container.resolve(DeleteOneUserInGroupQueueService);

        const data = {
            user_token_id,
            group_queue_id,
        } as IDeleteOneUserInGroupQueueDTO; // important, force typing in this case: QUERY STRING!

        const groupQueue = await service.execute(data);

        const statusCode = 202;

        const status = generateStatus(false, statusCode, 'Succesfully, group queue deleted!');

        const doc = classToClass(groupQueue);

        return res.status(statusCode).json({ status, doc });
    }
}

export { DeleteOneUserInGroupQueueController };
