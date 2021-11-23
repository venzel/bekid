import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ResetPasswordUserService } from './ResetPasswordUserService';
import { generateStatus } from '@shared/helpers/status';

class ResetPasswordUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { new_password, token } = req.body;

        const service = container.resolve(ResetPasswordUserService);

        await service.execute({ new_password, token });

        const status = generateStatus(false, 200, 'Succesfully password user reseted!');

        return res.status(200).json({ status });
    }
}

export { ResetPasswordUserController };
