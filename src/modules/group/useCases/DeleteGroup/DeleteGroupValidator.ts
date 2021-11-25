import { Request, Response, NextFunction } from 'express';
import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class DeleteGroupValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const groupId = req.params.id?.toString();

        if (!isIdValid(groupId, 'hash')) {
            throw new AppException('Group id invalid!');
        }

        return next();
    }
}

export { DeleteGroupValidator };