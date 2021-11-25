import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { ListCampaignService } from './ListCampaignService';
import { generateStatus } from '@shared/helpers/status';

class ListCampaignController {
    public async handle(_: Request, res: Response): Promise<Response> {
        const service = container.resolve(ListCampaignService);

        const campaigns = await service.execute();

        const status = generateStatus(false, 201, 'Succesfully listed campaigns!');

        const docs = classToClass(campaigns);

        return res.status(201).json({ status, docs });
    }
}

export { ListCampaignController };
