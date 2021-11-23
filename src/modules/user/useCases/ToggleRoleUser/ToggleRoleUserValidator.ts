import { Request, Response, NextFunction } from 'express';
import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class ToggleRoleUserValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { user_id } = req.auth;

        const user_params_id = req.params.id?.toString();

        if (!isIdValid(user_params_id, 'string')) {
            throw new AppException('User id invalid!', 400);
        }

        if (user_id === user_params_id) {
            throw new AppException('It is not possible to update role yourself!');
        }

        return next();
    }
}

export { ToggleRoleUserValidator };
