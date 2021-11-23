import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { generateStatus } from '@shared/helpers/status';
import { ForgotPasswordUserService } from './ForgotPasswordUserService';

class ForgotPasswordUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;

        const service = container.resolve(ForgotPasswordUserService);

        const token: string = await service.execute(email);

        const status = generateStatus(false, 200, 'Succesfully forgot user password!');

        const doc = { token };

        return res.status(200).json({ status, doc });
    }
}

export { ForgotPasswordUserController };
