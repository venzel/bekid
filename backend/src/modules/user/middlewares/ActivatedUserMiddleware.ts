import { Request, Response, NextFunction } from 'express';

import { AppException } from '@shared/exceptions/AppException';

class ActivatedUserMiddleware {
    public activated(req: Request, _: Response, next: NextFunction): any {
        const { user_token_activated } = req.auth;

        if (!user_token_activated) {
            throw new AppException('User not activated!');
        }

        return next();
    }
}

export { ActivatedUserMiddleware };
