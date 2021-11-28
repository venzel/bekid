import { Request, Response, NextFunction } from 'express';

import { AppException } from '@shared/exceptions/AppException';

class UpdateCampaignValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { name } = req.body;

        if (!name || name.length < 5 || name.length > 50) {
            throw new AppException(`Campaign name ${name} invalid!`, 400);
        }

        return next();
    }
}

export { UpdateCampaignValidator };
