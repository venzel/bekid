import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { CreateVoteService } from './CreateVoteService';
import { generateStatus } from '@shared/helpers/status';

class CreateVoteController {
    public async handle(req: Request, res: Response): Promise<Response> {
        const { campaign_id, emotion_id } = req.query;

        const campaignId = String(campaign_id);

        const emotionId = String(emotion_id);

        const userId = req.auth.user_id;

        console.log(userId);

        const service = container.resolve(CreateVoteService);

        const group = await service.handle({ campaign_id: campaignId, emotion_id: emotionId, user_id: userId });

        const status = generateStatus(false, 201, 'Succesfully created group!');

        const doc = classToClass(group);

        return res.status(201).json({ status, doc });
    }
}

export { CreateVoteController };
