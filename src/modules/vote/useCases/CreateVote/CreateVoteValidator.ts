import { Request, Response, NextFunction } from 'express';

import { ICreateVoteDTO } from '@modules/vote/dtos/ICreateVoteDTO';
import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class CreateVoteValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { campaign_id, emotion_id } = req.query;

        const data = {
            campaign_id,
            emotion_id,
        } as ICreateVoteDTO; // important, force typing in this case: QUERY STRING!

        if (!isIdValid(data.campaign_id, 'hash')) {
            throw new AppException(`Campaign id ${data.campaign_id} invalid!`);
        }

        if (!isIdValid(data.emotion_id, 'hash')) {
            throw new AppException(`Emotion id ${data.emotion_id} invalid!`);
        }

        return next();
    }
}

export { CreateVoteValidator };
