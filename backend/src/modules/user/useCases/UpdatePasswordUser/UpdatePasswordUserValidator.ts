import { Request, Response, NextFunction } from 'express';

import { isPasswordValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class UpdatePasswordUserValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { current_password, new_password } = req.body;

        if (!isPasswordValid(current_password)) {
            throw new AppException('Current passoword invalid!', 400);
        }

        if (!isPasswordValid(new_password)) {
            throw new AppException('New password invalid!', 400);
        }

        if (current_password === new_password) {
            throw new AppException('It is not possible to change to the same password!', 400);
        }

        return next();
    }
}

export { UpdatePasswordUserValidator };
