import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ListCampaignService } from './ListCampaignService';
import { generateStatus } from '@shared/helpers/status';

class ListCampaignController {
    public async handle(_: Request, res: Response): Promise<Response> {
        const service = container.resolve(ListCampaignService);

        const campaigns = await service.execute();

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully listed campaigns!');

        const docs = classToClass(campaigns);

        return res.status(statusCode).json({ status, docs });
    }
}

export { ListCampaignController };
