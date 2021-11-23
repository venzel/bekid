import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { ListUsersService } from './ListUsersService';
import { generateStatus } from '@shared/helpers/status';

class ListUsersController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { owner_id } = req.auth;

        const { count } = req.query;

        // TODO: aqui
        const query_count = Number(count);

        const service = container.resolve(ListUsersService);

        const users = await service.execute({ query_count, owner_id });

        const status = generateStatus(false, 200, 'Succesfully listed users!');

        const doc = classToClass(users);

        return res.status(200).json({ status, doc });
    }
}

export { ListUsersController };
