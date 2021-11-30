import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { CreateGroupService } from './CreateGroupService';
import { generateStatus } from '@shared/helpers/status';

class CreateGroupController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { name } = req.body;

        const { user_id } = req.auth;

        const service = container.resolve(CreateGroupService);

        const group = await service.execute({ user_id, name });

        const statusCode = 201;

        const status = generateStatus(false, statusCode, 'Succesfully created group!');

        const doc = classToClass(group);

        return res.status(statusCode).json({ status, doc });
    }
}

export { CreateGroupController };
