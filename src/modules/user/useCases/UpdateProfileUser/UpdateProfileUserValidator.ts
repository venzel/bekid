import { Request, Response, NextFunction } from 'express';
import { isNameValid } from '@modules/user/helpers/validator';
import { isEmailValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class UpdateProfileUserValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { name, email, current_password } = req.body;

        if (!isNameValid(name)) {
            throw new AppException('Name invalid!', 400);
        }

        if (!isEmailValid(email)) {
            throw new AppException('Email invalid!', 400);
        }

        if (!current_password) {
            throw new AppException('Current passoword invalid!', 400);
        }

        return next();
    }
}

export { UpdateProfileUserValidator };
