import { Request, Response, NextFunction } from 'express';
import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class DeleteVoteValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const voteId = req.params.id?.toString();

        if (!isIdValid(voteId, 'hash')) {
            throw new AppException('Vote id invalid!');
        }

        return next();
    }
}

export { DeleteVoteValidator };
