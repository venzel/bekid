import { Request, Response, NextFunction } from 'express';

import { idValidator } from '@shared/helpers/helperIdService';
import { IDeleteOneUserInGroupQueueDTO } from '@modules/group_queue/dtos/IDeleteOneUserInGroupQueueDTO';
import { AppException } from '@shared/exceptions/AppException';

class DeleteOneUserInGroupQueueValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { group_queue_id } = req.query;

        const data = {
            group_queue_id,
        } as IDeleteOneUserInGroupQueueDTO; // important, force typing in this case: QUERY STRING!

        if (!idValidator(data.group_queue_id)) {
            throw new AppException(`Group queue id ${data.group_queue_id} invalid!`);
        }

        return next();
    }
}

export { DeleteOneUserInGroupQueueValidator };
