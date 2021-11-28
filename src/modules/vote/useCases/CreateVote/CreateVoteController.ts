import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { CreateVoteService } from './CreateVoteService';
import { generateStatus } from '@shared/helpers/status';

class CreateVoteController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { campaign_id, emotion_id } = req.query;

        const campaignId = String(campaign_id);

        const emotionId = String(emotion_id);

        const userId = req.auth.user_id;

        const service = container.resolve(CreateVoteService);

        const vote = await service.handle({ campaign_id: campaignId, emotion_id: emotionId, user_id: userId });

        const statusCode = 201;

        const status = generateStatus(false, statusCode, 'Succesfully created vote!');

        const doc = classToClass(vote);

        return res.status(statusCode).json({ status, doc });
    }
}

export { CreateVoteController };
