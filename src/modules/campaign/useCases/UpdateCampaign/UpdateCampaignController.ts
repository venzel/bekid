import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { UpdateCampaignService } from './UpdateCampaignService';
import { generateStatus } from '@shared/helpers/status';

class UpdateCampaignController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { name } = req.body;

        const campaignId = req.params.id?.toString();

        const service = container.resolve(UpdateCampaignService);

        const campaign = await service.execute(campaignId, { name });

        const status = generateStatus(false, 201, 'Succesfully updated campaign!');

        const doc = classToClass(campaign);

        return res.status(200).json({ status, doc });
    }
}

export { UpdateCampaignController };
