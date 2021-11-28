import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { DeleteCampaignService } from './DeleteCampaignService';
import { generateStatus } from '@shared/helpers/status';

class DeleteCampaignController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const campaignId = req.params.id?.toString();

        const service = container.resolve(DeleteCampaignService);

        const campaign = await service.execute(campaignId);

        const statusCode = 202;

        const status = generateStatus(false, statusCode, 'Succesfully deleted campaign!');

        const doc = classToClass(campaign);

        return res.status(statusCode).json({ status, doc });
    }
}

export { DeleteCampaignController };
