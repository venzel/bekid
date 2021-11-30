import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { MonitoreGroupQueueService } from './MonitoreGroupQueueService';
import { generateStatus } from '@shared/helpers/status';

class MonitoreGroupQueueController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_token_id } = req.auth;

        const service = container.resolve(MonitoreGroupQueueService);

        const groupQueue = await service.execute(user_token_id);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully, groups queue listed!');

        const docs = classToClass(groupQueue);

        return res.status(statusCode).json({ status, docs });
    }
}

export { MonitoreGroupQueueController };
