import { Request, Response, NextFunction } from 'express';

import { idValidator } from '@shared/helpers/helperIdService';
import { ICreateVoteActorDTO } from '@modules/vote_actor/dtos/ICreateVoteActorDTO';
import { AppException } from '@shared/exceptions/AppException';

class CreateVoteActorValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { vote_id, actor_id } = req.query;

        const data = {
            vote_id,
            actor_id,
        } as ICreateVoteActorDTO; // important, force typing in this case: QUERY STRING!

        if (!idValidator(data.vote_id)) {
            throw new AppException(`Vote id ${data.vote_id} invalid!`);
        }

        if (!idValidator(data.actor_id)) {
            throw new AppException(`Actor id ${data.actor_id} invalid!`);
        }

        return next();
    }
}

export { CreateVoteActorValidator };
