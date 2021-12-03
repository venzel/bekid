import { Request, Response, NextFunction } from 'express';

import { idValidator } from '@shared/helpers/helperIdService';
import { AppException } from '@shared/exceptions/AppException';

class ToggleRoleUserValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { user_token_id } = req.auth;

        const userId = req.params.id;

        if (!idValidator(userId)) {
            throw new AppException(`User id ${userId} invalid!`, 400);
        }

        if (userId === user_token_id) {
            throw new AppException('It is not possible to update role yourself!');
        }

        return next();
    }
}

export { ToggleRoleUserValidator };
