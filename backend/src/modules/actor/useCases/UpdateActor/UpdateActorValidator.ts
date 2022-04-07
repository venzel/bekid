import { Request, Response, NextFunction } from 'express';

import { idValidator } from '@shared/helpers/helperIdService';
import { AppException } from '@shared/exceptions/AppException';

class UpdateActorValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { actor_id, name, slug } = req.body;

        if (!idValidator(actor_id)) {
            throw new AppException(`Actor id ${actor_id} invalid!`);
        }

        if (!name || name.length < 3 || name.length > 15) {
            throw new AppException(`Actor name ${name} invalid!`, 400);
        }

        if (!slug || slug.length < 3 || slug.length > 15) {
            throw new AppException(`Actor slug ${slug} invalid!`, 400);
        }

        return next();
    }
}

export { UpdateActorValidator };
