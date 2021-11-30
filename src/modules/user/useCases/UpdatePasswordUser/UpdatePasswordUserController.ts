import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { UpdatePasswordUserService } from './UpdatePasswordUserService';
import { generateStatus } from '@shared/helpers/status';

class UpdatePasswordUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_token_id } = req.auth;

        const { current_password, new_password } = req.body;

        const data = {
            user_token_id,
            current_password,
            new_password,
        };

        const service = container.resolve(UpdatePasswordUserService);

        await service.execute(data);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully, user password updated!');

        return res.status(statusCode).json({ status });
    }
}

export { UpdatePasswordUserController };
