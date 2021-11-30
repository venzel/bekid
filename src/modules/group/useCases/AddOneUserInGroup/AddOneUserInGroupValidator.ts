import { Request, Response, NextFunction } from 'express';

import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';
import { IAddOneUserInGroupDTO } from '@modules/group/dtos/IAddOneUserInGroupDTO';

class AddOneUserInGroupValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { group_queue_id, group_id, user_id } = req.query;

        const data = {
            group_queue_id,
            group_id,
            user_id,
        } as IAddOneUserInGroupDTO;

        if (!isIdValid(data.group_queue_id, 'hash')) {
            throw new AppException(`Group queue id ${group_id} invalid!`);
        }

        if (!isIdValid(data.group_id, 'hash')) {
            throw new AppException(`Group id ${group_id} invalid!`);
        }

        if (!isIdValid(data.user_id, 'hash')) {
            throw new AppException(`User id ${user_id} invalid!`);
        }

        return next();
    }
}

export { AddOneUserInGroupValidator };
