import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { DeleteUserService } from './DeleteUserService';
import { generateStatus } from '@shared/helpers/status';

class DeleteUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const userId = req.params.id?.toString();

        const service = container.resolve(DeleteUserService);

        const user = await service.execute(userId);

        const status = generateStatus(false, 200, 'Succesfully deleted user!');

        const doc = classToClass(user);

        return res.status(201).json({ status, doc });
    }
}

export { DeleteUserController };
