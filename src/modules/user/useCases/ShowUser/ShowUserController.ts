import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { ShowUserService } from './ShowUserService';
import { generateStatus } from '@shared/helpers/status';

class ShowUserController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const userId = req.params.id?.toString();

        const service = container.resolve(ShowUserService);

        const user = await service.execute(userId);

        const status = generateStatus(false, 200, 'Succesfully showed user!');

        const doc = classToClass(user);

        return res.status(200).json({ status, doc });
    }
}

export { ShowUserController };
