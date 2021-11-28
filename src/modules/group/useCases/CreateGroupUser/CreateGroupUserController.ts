import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { generateStatus } from '@shared/helpers/status';
import { CreateGroupUserService } from './CreateGroupUserService';

class CreateGroupUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { group_id, users_ids } = req.body;

        console.log(users_ids);

        const service = container.resolve(CreateGroupUserService);

        const groupUser = await service.execute({ group_id, users_ids });

        const codeStatus = 201;

        const status = generateStatus(false, codeStatus, 'Succesfully created group user!');

        const doc = classToClass(groupUser);

        return res.status(codeStatus).json({ status, doc });
    }
}

export { CreateGroupUserController };
