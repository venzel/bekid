import { Request, Response, NextFunction } from 'express';

import { idValidator } from '@shared/helpers/helperIdService';
import { ICreateVoteReasonDTO } from '@modules/vote_reason/dtos/ICreateVoteReasonDTO';
import { AppException } from '@shared/exceptions/AppException';

class CreateVoteReasonValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { vote_id, reason_id } = req.query;

        const data = {
            vote_id,
            reason_id,
        } as ICreateVoteReasonDTO; // important, force typing in this case: QUERY STRING!

        if (!idValidator(data.vote_id)) {
            throw new AppException(`Vote id ${data.vote_id} invalid!`);
        }

        if (!idValidator(data.reason_id)) {
            throw new AppException(`Reason id ${data.reason_id} invalid!`);
        }

        return next();
    }
}

export { CreateVoteReasonValidator };
