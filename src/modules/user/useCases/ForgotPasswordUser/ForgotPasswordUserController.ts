import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { generateStatus } from '@shared/helpers/status';
import { ForgotPasswordUserService } from './ForgotPasswordUserService';

class ForgotPasswordUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;

        const service = container.resolve(ForgotPasswordUserService);

        const token: string = await service.execute(email);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully forgot user password!');

        const doc = { token };

        return res.status(statusCode).json({ status, doc });
    }
}

export { ForgotPasswordUserController };
