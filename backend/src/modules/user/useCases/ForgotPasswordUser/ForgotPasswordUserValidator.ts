import { Request, Response, NextFunction } from 'express';

import { isEmailValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class ForgotPasswordUserValidator {
    public validate(req: Request, res: Response, next: NextFunction): any {
        const { email } = req.body;

        if (!isEmailValid(email)) {
            throw new AppException(`Email ${email} invalid!`, 400);
        }

        return next();
    }
}

export { ForgotPasswordUserValidator };
