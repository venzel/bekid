import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { CreateCampaignService } from './CreateCampaignService';
import { generateStatus } from '@shared/helpers/status';

class CreateCampaignController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { user_token_id } = req.auth;

        const { group_id, name } = req.body;

        const data = {
            user_token_id,
            group_id,
            name,
        };

        const service = container.resolve(CreateCampaignService);

        const campaign = await service.execute(data);

        const statusCode = 201;

        const status = generateStatus(false, statusCode, 'Succesfully, campaign created!');

        const doc = classToClass(campaign);

        return res.status(statusCode).json({ status, doc });
    }
}

export { CreateCampaignController };
