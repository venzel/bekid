import { Request, Response, NextFunction } from 'express';
import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class CreateVoteValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const campaignId = req.query.campaign_id?.toString();

        const emotionId = req.query.emotion_id?.toString();

        if (!isIdValid(campaignId, 'hash')) {
            throw new AppException('Campaign id invalid!');
        }

        if (!isIdValid(emotionId, 'hash')) {
            throw new AppException('Emotion id invalid!');
        }

        return next();
    }
}

export { CreateVoteValidator };
