import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { generateStatus } from '@shared/helpers/status';
import { UpdateReasonService } from './UpdateReasonService';

class UpdateReasonController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { reason_id, description } = req.body;

        const service = container.resolve(UpdateReasonService);

        const data = {
            reason_id,
            description,
        };

        const reason = await service.execute(data);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully, reason updated!');

        const doc = classToClass(reason);

        return res.status(statusCode).json({ status, doc });
    }
}

export { UpdateReasonController };
