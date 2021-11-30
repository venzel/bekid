import { Request, Response, NextFunction } from 'express';

import { isNameValid } from '@modules/user/helpers/validator';
import { isEmailValid, isPasswordValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';
import { IRegisterUserDTO } from '@modules/user/dtos/IRegisterUserDTO';

class RegisterUserValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { name, email, password, role } = req.body;

        const data = {
            name,
            email,
            password,
            role,
        } as IRegisterUserDTO; // important, force typing!

        if (!isNameValid(data.name)) {
            throw new AppException(`Name ${name} invalid!`, 400);
        }

        if (!isEmailValid(data.email)) {
            throw new AppException(`Email ${email} invalid!`, 400);
        }

        if (!isPasswordValid(data.password)) {
            throw new AppException('Password invalid!', 400);
        }

        const roles = ['USER', 'ADMIN', 'MANAGER'];

        if (!data.role || !roles.includes(data.role)) {
            throw new AppException(`role ${role} invalid!`, 400);
        }

        return next();
    }
}

export { RegisterUserValidator };
