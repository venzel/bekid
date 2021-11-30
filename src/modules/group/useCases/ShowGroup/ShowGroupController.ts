import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ShowGroupService } from './ShowGroupService';
import { generateStatus } from '@shared/helpers/status';

class ShowGroupController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_id: managerId, role } = req.auth;

        const groupId = req.params.id?.toString();

        const service = container.resolve(ShowGroupService);

        const group = await service.execute(groupId, managerId, role);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully showed group!');

        const doc = classToClass(group);

        return res.status(statusCode).json({ status, doc });
    }
}

export { ShowGroupController };
