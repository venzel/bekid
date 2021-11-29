import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { generateStatus } from '@shared/helpers/status';
import { SaveGroupUserService } from './SaveGroupUserService';

class SaveGroupUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_id: managerId, role } = req.auth;

        const { group_id, users_ids } = req.body;

        const service = container.resolve(SaveGroupUserService);

        const groupUser = await service.execute(managerId, role, { group_id, users_ids });

        const codeStatus = 201;

        const status = generateStatus(false, codeStatus, 'Succesfully created group user!');

        const doc = classToClass(groupUser);

        return res.status(codeStatus).json({ status, doc });
    }
}

export { SaveGroupUserController };
