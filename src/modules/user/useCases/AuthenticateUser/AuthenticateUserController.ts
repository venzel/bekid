import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { AuthenticateUserServiceProxy } from './AuthenticateUserServiceProxy';
import { generateStatus } from '@shared/helpers/status';

class AuthenticateUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const serviceProxy = container.resolve(AuthenticateUserServiceProxy);

        const user = await serviceProxy.execute({ email, password });

        const status = generateStatus(false, 200, 'Succesfully authenticated user!');

        const doc = classToClass(user);

        return res.status(200).json({ status, doc });
    }
}

export { AuthenticateUserController };
