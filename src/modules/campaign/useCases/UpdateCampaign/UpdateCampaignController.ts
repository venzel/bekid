import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { UpdateCampaignService } from './UpdateCampaignService';
import { generateStatus } from '@shared/helpers/status';

class UpdateCampaignController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { name } = req.body;

        const campaignId = req.params.id?.toString();

        const service = container.resolve(UpdateCampaignService);

        const campaign = await service.execute(campaignId, { name });

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully updated campaign!');

        const doc = classToClass(campaign);

        return res.status(statusCode).json({ status, doc });
    }
}

export { UpdateCampaignController };
