import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ListUserService } from './ListUserService';
import { generateStatus } from '@shared/helpers/status';

class ListUserController {
    public async handle(_: Request, res: Response): Promise<Response> {
        const service = container.resolve(ListUserService);

        const users = await service.execute();

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully listed users!');

        const docs = classToClass(users);

        return res.status(statusCode).json({ status, docs });
    }
}

export { ListUserController };
