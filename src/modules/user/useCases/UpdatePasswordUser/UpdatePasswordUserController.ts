import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { UpdatePasswordUserService } from './UpdatePasswordUserService';
import { generateStatus } from '@shared/helpers/status';

class UpdatePasswordUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_id } = req.auth;

        const { current_password, new_password } = req.body;

        const service = container.resolve(UpdatePasswordUserService);

        await service.execute({ current_password, new_password, user_id });

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully password user updated!');

        return res.status(statusCode).json({ status });
    }
}

export { UpdatePasswordUserController };
