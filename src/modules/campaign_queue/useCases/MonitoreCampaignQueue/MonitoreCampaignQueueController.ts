import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { MonitoreCampaignQueueService } from './MonitoreCampaignQueueService';
import { generateStatus } from '@shared/helpers/status';

class MonitoreCampaignQueueController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const userTokenId = req.auth.user_id;

        const service = container.resolve(MonitoreCampaignQueueService);

        const campaignQueue = await service.execute(userTokenId);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully listed campaign queue!');

        const docs = classToClass(campaignQueue);

        return res.status(statusCode).json({ status, docs });
    }
}

export { MonitoreCampaignQueueController };
