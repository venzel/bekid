import { Request, Response, NextFunction } from 'express';

import { idValidator } from '@shared/helpers/helperIdService';
import { isPasswordValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class ResetPasswordUserValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { new_password, token } = req.body;

        if (!isPasswordValid(new_password)) {
            throw new AppException(`New password invalid!`, 400);
        }

        if (!idValidator(token, 'uuid')) {
            throw new AppException(`Token invalid invalid!`, 400);
        }

        return next();
    }
}

export { ResetPasswordUserValidator };
