import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { generateStatus } from '@shared/helpers/status';
import { AddOneUserInGroupService } from './AddOneUserInGroupService';
import { IAddOneUserInGroupDTO } from '@modules/group/dtos/IAddOneUserInGroupDTO';

class AddOneUserInGroupController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const user_token_id = req.auth.user_id;

        const { group_queue_id, group_id, user_id } = req.query;

        const service = container.resolve(AddOneUserInGroupService);

        const data = {
            group_queue_id,
            group_id,
            user_id,
            user_token_id,
        } as IAddOneUserInGroupDTO; // important, force typing!

        const groupUser = await service.execute(data);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully, added user in group!');

        const doc = classToClass(groupUser);

        return res.status(statusCode).json({ status, doc });
    }
}

export { AddOneUserInGroupController };
