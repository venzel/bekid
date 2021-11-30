import { Request, Response, NextFunction } from 'express';

import { AppException } from '@shared/exceptions/AppException';

class UpdateGroupValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { group_id, name } = req.body;

        if (!group_id) {
            throw new AppException('Group id invalid!', 400);
        }

        if (!name || name.length < 5 || name.length > 50) {
            throw new AppException('Group name invalid!', 400);
        }

        return next();
    }
}

export { UpdateGroupValidator };
