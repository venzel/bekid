import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { generateStatus } from '@shared/helpers/status';
import { AddOneUserInGroupService } from './AddOneUserInGroupService';
import { IAddOneUserInGroupDTO } from '@modules/group/dtos/IAddOneUserInGroupDTO';

class AddOneUserInGroupController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_token_id } = req.auth;

        const { group_queue_id, group_id, user_id } = req.query;

        const service = container.resolve(AddOneUserInGroupService);

        const data = {
            user_token_id,
            group_queue_id,
            group_id,
            user_id,
        } as IAddOneUserInGroupDTO; // important, force typing in this case: QUERY STRING!

        const groupUser = await service.execute(data);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully, added user in group!');

        const doc = classToClass(groupUser);

        return res.status(statusCode).json({ status, doc });
    }
}

export { AddOneUserInGroupController };
