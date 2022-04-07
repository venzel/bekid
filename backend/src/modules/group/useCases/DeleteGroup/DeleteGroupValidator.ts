import { Request, Response, NextFunction } from 'express';

import { idValidator } from '@shared/helpers/helperIdService';
import { AppException } from '@shared/exceptions/AppException';

class DeleteGroupValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const groupId = req.params.id;

        if (!idValidator(groupId)) {
            throw new AppException(`Group id ${groupId} invalid!`);
        }

        return next();
    }
}

export { DeleteGroupValidator };
