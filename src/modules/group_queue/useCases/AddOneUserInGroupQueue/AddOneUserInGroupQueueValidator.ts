import { Request, Response, NextFunction } from 'express';

import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class AddOneUserInGroupQueueValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { group_id, user_id } = req.query;

        const groupId = group_id?.toString();

        const userId = user_id?.toString();

        const userTokenId = req.auth.user_id;

        if (!isIdValid(groupId, 'hash')) {
            throw new AppException(`Group id ${group_id} invalid!`);
        }

        if (!isIdValid(userId, 'hash')) {
            throw new AppException(`User id ${user_id} invalid!`);
        }

        if (user_id === userTokenId) {
            throw new AppException(`It is not possible to add to a group!`);
        }

        return next();
    }
}

export { AddOneUserInGroupQueueValidator };
