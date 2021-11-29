import { Request, Response, NextFunction } from 'express';

import { AppException } from '@shared/exceptions/AppException';

class SaveGroupUserValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        return next();
    }
}

export { SaveGroupUserValidator };
