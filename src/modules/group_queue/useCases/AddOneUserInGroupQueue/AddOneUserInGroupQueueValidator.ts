import { Request, Response, NextFunction } from 'express';

import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';
import { IAddOneUserInGroupQueueDTO } from '@modules/group_queue/dtos/IAddOneUserInGroupQueueDTO';

class AddOneUserInGroupQueueValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { group_id, user_id } = req.query;

        const { user_token_role } = req.auth;

        const data = {
            user_token_role,
            group_id,
            user_id,
        } as IAddOneUserInGroupQueueDTO; // important, force typing in this case: QUERY STRING!

        if (!isIdValid(data.group_id, 'hash')) {
            throw new AppException(`Group id ${data.group_id} invalid!`);
        }

        if (!isIdValid(data.user_id, 'hash')) {
            throw new AppException(`User id ${data.user_id} invalid!`);
        }

        if (data.user_id === user_token_role) {
            throw new AppException(`It is not possible to add to a group!`);
        }

        return next();
    }
}

export { AddOneUserInGroupQueueValidator };
