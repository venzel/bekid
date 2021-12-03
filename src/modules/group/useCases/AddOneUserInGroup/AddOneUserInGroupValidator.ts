import { Request, Response, NextFunction } from 'express';

import { idValidator } from '@shared/helpers/helperIdService';
import { IAddOneUserInGroupDTO } from '@modules/group/dtos/IAddOneUserInGroupDTO';
import { AppException } from '@shared/exceptions/AppException';

class AddOneUserInGroupValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { group_queue_id, group_id, user_id } = req.query;

        const data = {
            group_queue_id,
            group_id,
            user_id,
        } as IAddOneUserInGroupDTO; // important, force typing in this case: QUERY STRING!

        if (!idValidator(data.group_queue_id)) {
            throw new AppException(`Group queue id ${group_id} invalid!`);
        }

        if (!idValidator(data.group_id)) {
            throw new AppException(`Group id ${group_id} invalid!`);
        }

        if (!idValidator(data.user_id)) {
            throw new AppException(`User id ${user_id} invalid!`);
        }

        return next();
    }
}

export { AddOneUserInGroupValidator };
