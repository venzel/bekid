import { Request, Response, NextFunction } from 'express';
import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class ShowUserValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { owner_id, role } = req.auth;

        const user_params_id = req.params.id?.toString();

        if (!isIdValid(user_params_id, 'string')) {
            throw new AppException('User id invalid!');
        }

        if (role === 'USER' && user_params_id !== owner_id) {
            throw new AppException('It is not possible to show data another user!');
        }

        return next();
    }
}

export { ShowUserValidator };
