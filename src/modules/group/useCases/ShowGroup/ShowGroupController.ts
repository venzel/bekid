import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ShowGroupService } from './ShowGroupService';
import { generateStatus } from '@shared/helpers/status';

class ShowGroupController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_token_id, user_token_role } = req.auth;

        const group_id = req.params.id;

        const service = container.resolve(ShowGroupService);

        const data = {
            user_token_id,
            user_token_role,
            group_id,
        };

        const group = await service.execute(data);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully, group showed!');

        const doc = classToClass(group);

        return res.status(statusCode).json({ status, doc });
    }
}

export { ShowGroupController };
