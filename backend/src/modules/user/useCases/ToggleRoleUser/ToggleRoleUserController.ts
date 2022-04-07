import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ToggleRoleUserService } from './ToggleRoleUserService';
import { generateStatus } from '@shared/helpers/status';

class ToggleRoleUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const userId = req.params.id;

        const service = container.resolve(ToggleRoleUserService);

        const user = await service.execute(userId);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully, role user toggled!');

        const doc = classToClass(user);

        return res.status(statusCode).json({ status, doc });
    }
}

export { ToggleRoleUserController };