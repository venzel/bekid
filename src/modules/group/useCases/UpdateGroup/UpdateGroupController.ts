import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { UpdateGroupService } from './UpdateGroupService';
import { generateStatus } from '@shared/helpers/status';

class UpdateGroupController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_id: managerId, role } = req.auth;

        const { name } = req.body;

        const groupId = req.params.id?.toString();

        const service = container.resolve(UpdateGroupService);

        const group = await service.execute(groupId, managerId, role, { name });

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully updated group!');

        const doc = classToClass(group);

        return res.status(statusCode).json({ status, doc });
    }
}

export { UpdateGroupController };
