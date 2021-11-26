import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { ListUserService } from './ListUserService';
import { generateStatus } from '@shared/helpers/status';

class ListUserController {
    public async handle(_: Request, res: Response): Promise<Response> {
        const service = container.resolve(ListUserService);

        const users = await service.execute();

        const status = generateStatus(false, 200, 'Succesfully listed users!');

        const docs = classToClass(users);
        console.log(docs);

        return res.status(200).json({ status, docs });
    }
}

export { ListUserController };
