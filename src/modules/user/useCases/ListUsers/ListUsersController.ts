import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { ListUsersService } from './ListUsersService';
import { generateStatus } from '@shared/helpers/status';

class ListUsersController {
    public async handle(_: Request, res: Response): Promise<Response> {
        const service = container.resolve(ListUsersService);

        const users = await service.execute();

        const status = generateStatus(false, 200, 'Succesfully listed users!');

        const docs = classToClass(users);

        return res.status(200).json({ status, docs });
    }
}

export { ListUsersController };
