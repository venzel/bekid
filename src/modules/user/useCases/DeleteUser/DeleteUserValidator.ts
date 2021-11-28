import { Request, Response, NextFunction } from 'express';

import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class DeleteUserValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const ownerId = req.auth.user_id;

        const userId = req.params.id?.toString();

        if (ownerId === userId) {
            throw new AppException('it is not possible to delete itself!');
        }

        if (!isIdValid(userId, 'hash')) {
            throw new AppException('User id invalid!');
        }

        return next();
    }
}

export { DeleteUserValidator };
