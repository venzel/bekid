import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { DeleteReasonService } from './DeleteReasonService';
import { generateStatus } from '@shared/helpers/status';

class DeleteReasonController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const reasonId = req.params.id;

        const service = container.resolve(DeleteReasonService);

        const reason = await service.execute(reasonId);

        const statusCode = 202;

        const status = generateStatus(false, statusCode, 'Succesfully, reason deleted!');

        const doc = classToClass(reason);

        return res.status(statusCode).json({ status, doc });
    }
}

export { DeleteReasonController };
