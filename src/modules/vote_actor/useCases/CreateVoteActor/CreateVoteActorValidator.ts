import { Request, Response, NextFunction } from 'express';

import { ICreateVoteActorDTO } from '@modules/vote_actor/dtos/ICreateVoteActorDTO';
import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class CreateVoteActorValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { vote_id, actor_id } = req.query;

        const data = {
            vote_id,
            actor_id,
        } as ICreateVoteActorDTO; // important, force typing in this case: QUERY STRING!

        if (!isIdValid(data.vote_id, 'hash')) {
            throw new AppException(`Vote id ${data.vote_id} invalid!`);
        }

        if (!isIdValid(data.actor_id, 'hash')) {
            throw new AppException(`Actor id ${data.actor_id} invalid!`);
        }

        return next();
    }
}

export { CreateVoteActorValidator };
