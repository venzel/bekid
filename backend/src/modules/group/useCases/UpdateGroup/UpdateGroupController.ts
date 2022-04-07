import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { UpdateGroupService } from './UpdateGroupService';
import { generateStatus } from '@shared/helpers/status';

class UpdateGroupController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_token_id, user_token_role } = req.auth;

        const { group_id, name } = req.body;

        const data = {
            user_token_id,
            user_token_role,
            group_id,
            name,
        };

        const service = container.resolve(UpdateGroupService);

        const group = await service.execute(data);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully updated group!');

        const doc = classToClass(group);

        return res.status(statusCode).json({ status, doc });
    }
}

export { UpdateGroupController };
