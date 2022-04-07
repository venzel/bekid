import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ToggleAllowUserService } from './ToggleAllowUserService';
import { generateStatus } from '@shared/helpers/status';

class ToggleAllowUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const userId = req.params.id;

        const service = container.resolve(ToggleAllowUserService);

        const user = await service.execute(userId);

        const status = generateStatus(false, 200, 'Succesfully, user allow toggled!');

        const doc = classToClass(user);

        return res.status(200).json({ status, doc });
    }
}

export { ToggleAllowUserController };
