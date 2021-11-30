import { Request, Response, NextFunction } from 'express';

import { IDeleteOneUserInGroupQueueDTO } from '@modules/group_queue/dtos/IDeleteOneUserInGroupQueueDTO';
import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class DeleteOneUserInGroupQueueValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { group_queue_id } = req.query;

        const data = {
            group_queue_id,
        } as IDeleteOneUserInGroupQueueDTO; // important, force typing in this case: QUERY STRING!

        if (!isIdValid(data.group_queue_id, 'hash')) {
            throw new AppException(`Group queue id ${data.group_queue_id} invalid!`);
        }

        return next();
    }
}

export { DeleteOneUserInGroupQueueValidator };
