import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ShowReasonService } from './ShowReasonService';
import { generateStatus } from '@shared/helpers/status';

class ShowReasonController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const reasonId = req.params.id;

        const service = container.resolve(ShowReasonService);

        const reason = await service.execute(reasonId);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully, reason showed!');

        const doc = classToClass(reason);

        return res.status(statusCode).json({ status, doc });
    }
}

export { ShowReasonController };
