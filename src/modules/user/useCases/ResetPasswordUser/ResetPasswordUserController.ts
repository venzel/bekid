import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { ResetPasswordUserService } from './ResetPasswordUserService';
import { generateStatus } from '@shared/helpers/status';

class ResetPasswordUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { new_password, token } = req.body;

        const service = container.resolve(ResetPasswordUserService);

        await service.execute({ new_password, token });

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully password user reseted!');

        return res.status(statusCode).json({ status });
    }
}

export { ResetPasswordUserController };
