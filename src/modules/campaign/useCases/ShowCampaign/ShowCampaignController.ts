import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { ShowCampaignService } from './ShowCampaignService';
import { generateStatus } from '@shared/helpers/status';

class ShowCampaignController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const campaignId = req.params.id?.toString();

        const service = container.resolve(ShowCampaignService);

        const campaign = await service.execute(campaignId);

        const status = generateStatus(false, 200, 'Succesfully showed campaign!');

        const doc = classToClass(campaign);

        return res.status(200).json({ status, doc });
    }
}

export { ShowCampaignController };
