import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { CreateGroupService } from './CreateGroupService';
import { generateStatus } from '@shared/helpers/status';

class CreateGroupController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_token_id } = req.auth;

        const { name } = req.body;

        const service = container.resolve(CreateGroupService);

        const data = {
            user_token_id,
            name,
        };

        const group = await service.execute(data);

        const statusCode = 201;

        const status = generateStatus(false, statusCode, 'Succesfully, group created!');

        const doc = classToClass(group);

        return res.status(statusCode).json({ status, doc });
    }
}

export { CreateGroupController };
