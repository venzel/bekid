import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { CreateCampaignService } from './CreateCampaignService';
import { generateStatus } from '@shared/helpers/status';

class CreateCampaignController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { group_id, name } = req.body;

        const { user_id } = req.auth;

        const service = container.resolve(CreateCampaignService);

        const campaign = await service.execute({ group_id, user_id, name });

        const statusCode = 201;

        const status = generateStatus(false, statusCode, 'Succesfully created campaign!');

        const doc = classToClass(campaign);

        return res.status(statusCode).json({ status, doc });
    }
}

export { CreateCampaignController };
