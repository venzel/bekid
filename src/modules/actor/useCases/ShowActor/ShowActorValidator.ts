import { Request, Response, NextFunction } from 'express';

import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class ShowActorValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const actorId = req.params.id;

        if (!isIdValid(actorId, 'hash')) {
            throw new AppException('Actor id invalid!');
        }

        return next();
    }
}

export { ShowActorValidator };
