import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { UpdateCampaignService } from './UpdateCampaignService';
import { generateStatus } from '@shared/helpers/status';

class UpdateCampaignController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_token_id, user_token_role } = req.auth;

        const { campaign_id, name } = req.body;

        const data = {
            user_token_id,
            user_token_role,
            campaign_id,
            name,
        };

        const service = container.resolve(UpdateCampaignService);

        const campaign = await service.execute(data);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully, campaign updated!');

        const doc = classToClass(campaign);

        return res.status(statusCode).json({ status, doc });
    }
}

export { UpdateCampaignController };
