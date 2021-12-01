import { Request, Response, NextFunction } from 'express';

import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class ShowReasonValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const reasonId = req.params.id;

        if (!isIdValid(reasonId, 'hash')) {
            throw new AppException(`Reason id ${reasonId} invalid!`);
        }

        return next();
    }
}

export { ShowReasonValidator };
