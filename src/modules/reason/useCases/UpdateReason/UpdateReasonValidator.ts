import { Request, Response, NextFunction } from 'express';

import { idValidator } from '@shared/helpers/helperIdService';
import { AppException } from '@shared/exceptions/AppException';

class UpdateReasonValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { reason_id, description } = req.body;

        if (!idValidator(reason_id)) {
            throw new AppException(`Reason id ${reason_id} invalid!`);
        }

        if (!description || description.length < 3 || description.length > 15) {
            throw new AppException(`Reason description ${description} invalid!`, 400);
        }

        return next();
    }
}

export { UpdateReasonValidator };
