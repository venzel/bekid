import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { UpdateAvatarUserService } from './UpdateAvatarUserService';
import { generateStatus } from '@shared/helpers/status';

class UpdateAvatarUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_id } = req.auth;

        const filename = req.file?.filename;

        const service = container.resolve(UpdateAvatarUserService);

        const user = await service.execute({ filename, user_id });

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully updated avatar user!');

        const doc = classToClass(user);

        return res.status(statusCode).json({ status, doc });
    }
}

export { UpdateAvatarUserController };
