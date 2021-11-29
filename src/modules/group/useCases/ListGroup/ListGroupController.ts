import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ListGroupService } from './ListGroupService';
import { generateStatus } from '@shared/helpers/status';

class ListGroupController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_id: managerId, role } = req.auth;

        const service = container.resolve(ListGroupService);

        const groups = await service.execute(managerId, role);

        const codeStatus = 200;

        const status = generateStatus(false, codeStatus, 'Succesfully listed groups!');

        const docs = classToClass(groups);

        return res.status(codeStatus).json({ status, docs });
    }
}

export { ListGroupController };
