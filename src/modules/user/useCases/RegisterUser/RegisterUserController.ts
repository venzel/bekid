import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { RegisterUserService } from './RegisterUserService';
import { generateStatus } from '@shared/helpers/status';

class RegisterUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { name, email, role, password } = req.body;

        const service = container.resolve(RegisterUserService);

        const data = {
            name,
            email,
            password,
            role,
        };

        const user = await service.execute(data);

        const statusCode = 201;

        const status = generateStatus(false, statusCode, 'Succesfully, user created!');

        const doc = classToClass(user);

        return res.status(statusCode).json({ status, doc });
    }
}

export { RegisterUserController };
