import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { DeleteUserService } from './DeleteUserService';
import { generateStatus } from '@shared/helpers/status';

class DeleteUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const userId = req.params.id?.toString();

        const service = container.resolve(DeleteUserService);

        const user = await service.execute(userId);

        const statusCode = 202;

        const status = generateStatus(false, statusCode, 'Succesfully deleted user!');

        const doc = classToClass(user);

        return res.status(statusCode).json({ status, doc });
    }
}

export { DeleteUserController };
