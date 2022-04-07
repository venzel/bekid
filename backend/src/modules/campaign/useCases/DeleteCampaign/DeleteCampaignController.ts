import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { DeleteCampaignService } from './DeleteCampaignService';
import { generateStatus } from '@shared/helpers/status';

class DeleteCampaignController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_token_id, user_token_role } = req.auth;

        const campaign_id = req.params.id;

        const service = container.resolve(DeleteCampaignService);

        const data = {
            user_token_id,
            user_token_role,
            campaign_id,
        };

        const campaign = await service.execute(data);

        const statusCode = 202;

        const status = generateStatus(false, statusCode, 'Succesfully, campaign deleted!');

        const doc = classToClass(campaign);

        return res.status(statusCode).json({ status, doc });
    }
}

export { DeleteCampaignController };
