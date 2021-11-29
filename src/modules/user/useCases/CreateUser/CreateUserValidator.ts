import { Request, Response, NextFunction } from 'express';

import { isNameValid } from '@modules/user/helpers/validator';
import { isEmailValid, isPasswordValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class CreateUserValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { name, email, password, role } = req.body;

        if (!isNameValid(name)) {
            throw new AppException(`Name ${name} invalid!`, 400);
        }

        if (!isEmailValid(email)) {
            throw new AppException(`Email ${email} invalid!`, 400);
        }

        if (!isPasswordValid(password)) {
            throw new AppException('Password invalid!', 400);
        }

        const roles = ['USER', 'ADMIN', 'MANAGER'];

        if (!role || !roles.includes(role)) {
            throw new AppException(`role ${role} invalid!`, 400);
        }

        return next();
    }
}

export { CreateUserValidator };
