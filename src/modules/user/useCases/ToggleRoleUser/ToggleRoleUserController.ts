import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { ToggleRoleUserService } from './ToggleRoleUserService';
import { generateStatus } from '@shared/helpers/status';

class ToggleRoleUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const user_params_id = String(req.params.id);

        const service = container.resolve(ToggleRoleUserService);

        const user = await service.execute(user_params_id);

        const status = generateStatus(false, 200, 'Succesfully toggle role user!');

        const doc = classToClass(user);

        return res.status(200).json({ status, doc });
    }
}

export { ToggleRoleUserController };
