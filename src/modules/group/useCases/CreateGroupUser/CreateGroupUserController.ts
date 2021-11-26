import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { generateStatus } from '@shared/helpers/status';
import { CreateGroupUserService } from './CreateGroupUserService';

class CreateGroupUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { group_id, users_ids } = req.body;

        console.log(users_ids);

        const service = container.resolve(CreateGroupUserService);

        const status = generateStatus(false, 201, 'Succesfully created group user!');

        const groupUser = await service.execute({ group_id, users_ids });

        const doc = classToClass(groupUser);

        return res.status(201).json({ status, doc });
    }
}

export { CreateGroupUserController };
