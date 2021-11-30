import { Request, Response, NextFunction } from 'express';

import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class ShowUserValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const userId = req.params.id;

        const { user_token_id, user_token_role } = req.auth;

        if (!isIdValid(userId, 'hash')) {
            throw new AppException('User id invalid!');
        }

        if (user_token_role !== 'ADMIN' && userId !== user_token_id) {
            throw new AppException('It is not possible to show another user!');
        }

        return next();
    }
}

export { ShowUserValidator };
