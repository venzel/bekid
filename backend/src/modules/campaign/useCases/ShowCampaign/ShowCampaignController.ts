import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { ShowCampaignService } from './ShowCampaignService';
import { generateStatus } from '@shared/helpers/status';

class ShowCampaignController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_token_id, user_token_role } = req.auth;

        const campaign_id = req.params.id;

        const data = {
            user_token_id,
            user_token_role,
            campaign_id,
        };

        const service = container.resolve(ShowCampaignService);

        const campaign = await service.execute(data);

        const statusCode = 200;

        const status = generateStatus(false, statusCode, 'Succesfully, campaign showed!');

        const doc = classToClass(campaign);

        return res.status(statusCode).json({ status, doc });
    }
}

export { ShowCampaignController };
