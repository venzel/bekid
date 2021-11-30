import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { IAddOneUserInGroupQueueDTO } from '@modules/group_queue/dtos/IAddOneUserInGroupQueueDTO';
import { AddOneUserInGroupQueueService } from './AddOneUserInGroupQueueService';
import { generateStatus } from '@shared/helpers/status';

class AddOneUserInGroupQueueController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { group_id, user_id } = req.query;

        const user_token_id = req.auth.user_id;

        const data = {
            group_id,
            user_id,
            user_token_id,
        } as IAddOneUserInGroupQueueDTO; // important, force typing!

        const service = container.resolve(AddOneUserInGroupQueueService);

        const groupQueue = await service.execute(data);

        const codeStatus = 201;

        const status = generateStatus(false, codeStatus, 'Succesfully, group queue created!');

        const doc = classToClass(groupQueue);

        return res.status(codeStatus).json({ status, doc });
    }
}

export { AddOneUserInGroupQueueController };
