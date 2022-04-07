import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ListGroupService } from './ListGroupService';
import { generateStatus } from '@shared/helpers/status';

class ListGroupController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_token_id, user_token_role } = req.auth;

        const service = container.resolve(ListGroupService);

        const data = {
            user_token_id,
            user_token_role,
        };

        const groups = await service.execute(data);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully, groups listed!');

        const docs = classToClass(groups);

        return res.status(statusCode).json({ status, docs });
    }
}

export { ListGroupController };
