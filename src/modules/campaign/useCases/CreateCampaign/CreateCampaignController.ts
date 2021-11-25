import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { CreateCampaignService } from './CreateCampaignService';
import { generateStatus } from '@shared/helpers/status';

class CreateCampaignController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { name } = req.body;

        const service = container.resolve(CreateCampaignService);

        const campaign = await service.handle({ name });

        const status = generateStatus(false, 201, 'Succesfully created campaign!');

        const doc = classToClass(campaign);

        return res.status(201).json({ status, doc });
    }
}

export { CreateCampaignController };
