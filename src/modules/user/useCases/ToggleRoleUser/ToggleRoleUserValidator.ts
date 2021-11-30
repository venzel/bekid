import { Request, Response, NextFunction } from 'express';

import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class ToggleRoleUserValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { user_token_id } = req.auth;

        const userId = req.params.id;

        if (!isIdValid(userId, 'hash')) {
            throw new AppException('User id invalid!', 400);
        }

        if (userId === user_token_id) {
            throw new AppException('It is not possible to update role yourself!');
        }

        return next();
    }
}

export { ToggleRoleUserValidator };
