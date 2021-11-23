import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdatePasswordUserService } from './UpdatePasswordUserService';
import { generateStatus } from '@shared/helpers/status';

class UpdatePasswordUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_id } = req.auth;

        const { current_password, new_password } = req.body;

        const service = container.resolve(UpdatePasswordUserService);

        await service.execute({ current_password, new_password, user_id });

        const status = generateStatus(false, 200, 'Succesfully password user updated!');

        return res.status(200).json({ status });
    }
}

export { UpdatePasswordUserController };
