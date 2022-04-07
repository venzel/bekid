import { Request, Response, NextFunction } from 'express';

import { idValidator } from '@shared/helpers/helperIdService';
import { AppException } from '@shared/exceptions/AppException';

class DeleteReasonValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const reasonId = req.params.id;

        if (!idValidator(reasonId)) {
            throw new AppException(`Reason id ${reasonId} invalid!`);
        }

        return next();
    }
}

export { DeleteReasonValidator };
