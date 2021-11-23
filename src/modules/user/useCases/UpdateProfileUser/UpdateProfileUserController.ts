import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { UpdateProfileUserService } from './UpdateProfileUserService';
import { generateStatus } from '@shared/helpers/status';

class UpdateProfileUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { owner_id } = req.auth;

        const { name, email, current_password } = req.body;

        const service = container.resolve(UpdateProfileUserService);

        const user = await service.execute({ name, email, current_password, owner_id });

        const status = generateStatus(false, 200, 'Succesfully profile user, updated!');

        const doc = classToClass(user);

        return res.status(200).json({ status, doc });
    }
}

export { UpdateProfileUserController };
