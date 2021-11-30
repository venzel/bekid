import { Request, Response, NextFunction } from 'express';

import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class DeleteCampaignValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const campaignId = req.params.id;

        if (!isIdValid(campaignId, 'hash')) {
            throw new AppException(`Campaign id ${campaignId} invalid!`);
        }

        return next();
    }
}

export { DeleteCampaignValidator };
