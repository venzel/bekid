import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ShowCampaignService } from './ShowCampaignService';
import { generateStatus } from '@shared/helpers/status';

class ShowCampaignController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const campaignId = req.params.id?.toString();

        const service = container.resolve(ShowCampaignService);

        const campaign = await service.execute(campaignId);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully showed campaign!');

        const doc = classToClass(campaign);

        return res.status(statusCode).json({ status, doc });
    }
}

export { ShowCampaignController };
