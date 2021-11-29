import { Request, Response, NextFunction } from 'express';

import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class AddOneUserInQueueValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { group_id, user_id } = req.query;

        const groupId = group_id?.toString();

        const userId = user_id?.toString();

        const userTokeId = req.auth.user_id;

        if (!isIdValid(groupId, 'hash')) {
            throw new AppException(`Group id ${group_id} invalid!`);
        }

        if (!isIdValid(userId, 'hash')) {
            throw new AppException(`User id ${user_id} invalid!`);
        }

        if (user_id === userTokeId) {
            throw new AppException(`It is not possible to add to a group!`);
        }

        return next();
    }
}

export { AddOneUserInQueueValidator };
