import { Request, Response, NextFunction } from 'express';

import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class ShowCampaignValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const campaignId = req.params.id?.toString();

        if (!isIdValid(campaignId, 'hash')) {
            throw new AppException(`Campaign id ${campaignId} invalid!`);
        }

        return next();
    }
}

export { ShowCampaignValidator };
