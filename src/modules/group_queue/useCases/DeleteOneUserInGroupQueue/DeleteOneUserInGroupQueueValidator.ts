import { Request, Response, NextFunction } from 'express';

import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class DeleteOneUserInGroupQueueValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const groupQueueId = req.query.group_queue_id?.toString();

        if (!isIdValid(groupQueueId, 'hash')) {
            throw new AppException(`Group queue id ${groupQueueId} invalid!`);
        }

        return next();
    }
}

export { DeleteOneUserInGroupQueueValidator };
