import { Request, Response, NextFunction } from 'express';

import { AppException } from '@shared/exceptions/AppException';

class CreateCampaignValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { grou_id, name } = req.body;

        if (!grou_id) {
            throw new AppException('Group id invalid!', 400);
        }

        if (!name || name.length < 5 || name.length > 50) {
            throw new AppException('Campaign name invalid!', 400);
        }

        return next();
    }
}

export { CreateCampaignValidator };
