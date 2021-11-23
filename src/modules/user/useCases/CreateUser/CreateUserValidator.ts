import { Request, Response, NextFunction } from 'express';
import { isNameValid } from '@modules/user/helpers/validator';
import { isEmailValid, isPasswordValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class CreateUserValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { name, email, password } = req.body;

        if (!isNameValid(name)) {
            throw new AppException('Name invalid!', 400);
        }

        if (!isEmailValid(email)) {
            throw new AppException('Email invalid!', 400);
        }

        if (!isPasswordValid(password)) {
            throw new AppException('Password invalid!', 400);
        }

        return next();
    }
}

export { CreateUserValidator };
