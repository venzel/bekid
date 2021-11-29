import { Request, Response, NextFunction } from 'express';

import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class MonitoreCampaignQueueValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const userId = req.params.id?.toString();

        if (!isIdValid(userId, 'hash')) {
            throw new AppException(`User id ${userId} invalid!`);
        }

        return next();
    }
}

export { MonitoreCampaignQueueValidator };
