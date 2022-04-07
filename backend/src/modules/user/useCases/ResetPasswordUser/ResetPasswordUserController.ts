import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { ResetPasswordUserService } from './ResetPasswordUserService';
import { generateStatus } from '@shared/helpers/status';

class ResetPasswordUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { new_password, token } = req.body;

        const service = container.resolve(ResetPasswordUserService);

        const data = {
            new_password,
            token,
        };

        await service.execute(data);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully, user password reseted!');

        return res.status(statusCode).json({ status });
    }
}

export { ResetPasswordUserController };
