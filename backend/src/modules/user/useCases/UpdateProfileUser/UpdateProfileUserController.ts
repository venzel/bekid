import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { UpdateProfileUserService } from './UpdateProfileUserService';
import { generateStatus } from '@shared/helpers/status';

class UpdateProfileUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_token_id } = req.auth;

        const { name, email, current_password } = req.body;

        const service = container.resolve(UpdateProfileUserService);

        const data = {
            user_token_id,
            name,
            email,
            current_password,
        };

        const user = await service.execute(data);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully, user profile updated!');

        const doc = classToClass(user);

        return res.status(statusCode).json({ status, doc });
    }
}

export { UpdateProfileUserController };
