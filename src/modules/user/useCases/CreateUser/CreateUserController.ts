import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { CreateUserServiceProxy } from './CreateUserServiceProxy';
import { generateStatus } from '@shared/helpers/status';

class CreateUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;

        const serviceProxy = container.resolve(CreateUserServiceProxy);

        const user = await serviceProxy.execute({ name, email, password });

        const status = generateStatus(false, 201, 'Succesfully created user!');

        const doc = classToClass(user);

        return res.status(201).json({ status, doc });
    }
}

export { CreateUserController };
