import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { UpdateAvatarUserService } from './UpdateAvatarUserService';
import { generateStatus } from '@shared/helpers/status';

class UpdateAvatarUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { owner_id } = req.auth;

        const filename = req.file?.filename;

        const service = container.resolve(UpdateAvatarUserService);

        const user = await service.execute({ filename, owner_id });

        const status = generateStatus(false, 200, 'Succesfully updated avatar user!');

        const doc = classToClass(user);

        return res.status(200).json({ status, doc });
    }
}

export { UpdateAvatarUserController };
