import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { DeleteGroupService } from './DeleteGroupService';
import { generateStatus } from '@shared/helpers/status';

class DeleteGroupController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_token_id, user_token_role } = req.auth;

        const group_id = req.params.id;

        const service = container.resolve(DeleteGroupService);

        const data = {
            user_token_id,
            user_token_role,
            group_id,
        };

        const group = await service.execute(data);

        const statusCode = 202;

        const status = generateStatus(false, statusCode, 'Succesfully, group deleted!');

        const doc = classToClass(group);

        return res.status(statusCode).json({ status, doc });
    }
}

export { DeleteGroupController };
