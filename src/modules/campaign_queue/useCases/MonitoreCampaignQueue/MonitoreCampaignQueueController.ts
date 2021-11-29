import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { MonitoreCampaignQueueService } from './MonitoreCampaignQueueService';
import { generateStatus } from '@shared/helpers/status';

class MonitoreCampaignQueueController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const campaignId = req.params.id?.toString();

        const service = container.resolve(MonitoreCampaignQueueService);

        const campaign = await service.execute(campaignId);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully listed campaigns!');

        const docs = classToClass(campaign);

        return res.status(statusCode).json({ status, docs });
    }
}

export { MonitoreCampaignQueueController };
