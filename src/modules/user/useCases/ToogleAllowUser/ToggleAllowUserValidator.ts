import { Request, Response, NextFunction } from 'express';

import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class ToggleAllowUserValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { user_token_id } = req.auth;

        const userId = req.params.id;

        if (!isIdValid(userId, 'hash')) {
            throw new AppException('User id invalid!', 400);
        }

        if (user_token_id === userId) {
            throw new AppException('It is not possible to update allow yourself!');
        }

        return next();
    }
}

export { ToggleAllowUserValidator };
