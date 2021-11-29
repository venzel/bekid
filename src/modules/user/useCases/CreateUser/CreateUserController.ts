import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { CreateUserService } from './CreateUserService';
import { generateStatus } from '@shared/helpers/status';

class CreateUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { name, email, role, password } = req.body;

        const service = container.resolve(CreateUserService);

        const user = await service.execute({ name, email, password, role });

        const codeStatus = 201;

        const status = generateStatus(false, codeStatus, 'Succesfully created user!');

        const doc = classToClass(user);

        return res.status(codeStatus).json({ status, doc });
    }
}

export { CreateUserController };
