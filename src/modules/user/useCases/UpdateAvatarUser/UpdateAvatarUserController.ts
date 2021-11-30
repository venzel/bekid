import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { UpdateAvatarUserService } from './UpdateAvatarUserService';
import { generateStatus } from '@shared/helpers/status';
import { IUpdateAvatarUserDTO } from '@modules/user/dtos/IUpdateAvatarUserDTO';

class UpdateAvatarUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_token_id } = req.auth;

        const filename = req.file?.filename;

        const service = container.resolve(UpdateAvatarUserService);

        const data = {
            filename,
            user_token_id,
        } as IUpdateAvatarUserDTO; // important, force typing!

        const user = await service.execute(data);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully, avatar user updated!');

        const doc = classToClass(user);

        return res.status(statusCode).json({ status, doc });
    }
}

export { UpdateAvatarUserController };
