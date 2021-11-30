import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { AuthenticateUserServiceProxy } from './AuthenticateUserServiceProxy';
import { generateStatus } from '@shared/helpers/status';
import { IAuthenticateUserDTO } from '@modules/user/dtos/IAuthenticateUserDTO';

class AuthenticateUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const serviceProxy = container.resolve(AuthenticateUserServiceProxy);

        const data = {
            email,
            password,
        } as IAuthenticateUserDTO; // important, force typing!

        const user = await serviceProxy.execute(data);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully, user authenticated!');

        const doc = classToClass(user);

        return res.status(statusCode).json({ status, doc });
    }
}

export { AuthenticateUserController };
