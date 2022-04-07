import { Request, Response, NextFunction } from 'express';

import { idValidator } from '@shared/helpers/helperIdService';
import { AppException } from '@shared/exceptions/AppException';

class DeleteCampaignValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const campaignId = req.params.id;

        if (!idValidator(campaignId)) {
            throw new AppException(`Campaign id ${campaignId} invalid!`);
        }

        return next();
    }
}

export { DeleteCampaignValidator };
