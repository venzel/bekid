import { Request, Response, NextFunction } from 'express';

import { AppException } from '@shared/exceptions/AppException';

class ActivatedUserMiddleware {
    public activated(req: Request, _: Response, next: NextFunction): any {
        const { activated } = req.auth;

        if (!activated) {
            throw new AppException('User not activated!');
        }

        return next();
    }
}

export { ActivatedUserMiddleware };
