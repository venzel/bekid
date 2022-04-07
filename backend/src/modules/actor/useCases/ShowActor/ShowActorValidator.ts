import { Request, Response, NextFunction } from 'express';

import { idValidator } from '@shared/helpers/helperIdService';
import { AppException } from '@shared/exceptions/AppException';

class ShowActorValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const actorId = req.params.id;

        if (!idValidator(actorId)) {
            throw new AppException(`Actor id ${actorId} invalid!`);
        }

        return next();
    }
}

export { ShowActorValidator };
