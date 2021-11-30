import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { UpdateProfileUserService } from './UpdateProfileUserService';
import { generateStatus } from '@shared/helpers/status';

class UpdateProfileUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const userId = req.auth.user_id;

        const { name, email, current_password } = req.body;

        const service = container.resolve(UpdateProfileUserService);

        const user = await service.execute(userId, { name, email, current_password });

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully profile user, updated!');

        const doc = classToClass(user);

        return res.status(statusCode).json({ status, doc });
    }
}

export { UpdateProfileUserController };
