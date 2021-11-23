import { Request, Response, NextFunction } from 'express';
import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class DeleteUserValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { owner_id } = req.auth;

        const user_params_id = req.params.id?.toString();

        if (!isIdValid(user_params_id, 'string')) {
            throw new AppException('User id invalid!');
        }

        if (owner_id === user_params_id) {
            throw new AppException('It is not possible to delete yourself!');
        }

        return next();
    }
}

export { DeleteUserValidator };
