import { Request, Response, NextFunction } from 'express';

import { idValidator } from '@shared/helpers/helperIdService';
import { AppException } from '@shared/exceptions/AppException';

class UpdateCampaignValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { campaign_id, group_id, name } = req.body;

        if (!idValidator(campaign_id)) {
            throw new AppException(`Campaign id ${campaign_id} invalid!`);
        }

        if (!idValidator(group_id)) {
            throw new AppException(`Group id ${group_id} invalid!`);
        }

        if (!name || name.length < 5 || name.length > 50) {
            throw new AppException(`Campaign name ${name} invalid!`, 400);
        }

        return next();
    }
}

export { UpdateCampaignValidator };
