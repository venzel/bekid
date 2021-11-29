import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { AddOneUserInQueueService } from './AddOneUserInQueueService';
import { generateStatus } from '@shared/helpers/status';

class AddOneUserInQueueController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { group_id, user_id } = req.query;

        console.log(`aaaaaaaaaaaaaaaaaaaaaaaaaaaaa`);

        const groupId = String(group_id);

        const userId = String(user_id);

        const userTokenId = req.auth.user_id;

        const service = container.resolve(AddOneUserInQueueService);

        const groupQueue = await service.execute({ group_id: groupId, user_id: userId }, userTokenId);

        const codeStatus = 201;

        const status = generateStatus(false, codeStatus, 'Succesfully created group queue!');

        const doc = classToClass(groupQueue);

        return res.status(codeStatus).json({ status, doc });
    }
}

export { AddOneUserInQueueController };
