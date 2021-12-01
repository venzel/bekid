import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ListReasonService } from './ListReasonService';
import { generateStatus } from '@shared/helpers/status';

class ListReasonController {
    public async handle(_: Request, res: Response): Promise<Response> {
        const service = container.resolve(ListReasonService);

        const reasons = await service.execute();

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully, reasons listed!');

        const docs = classToClass(reasons);

        return res.status(statusCode).json({ status, docs });
    }
}

export { ListReasonController };
