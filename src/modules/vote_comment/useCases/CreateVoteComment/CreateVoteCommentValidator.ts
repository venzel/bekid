import { Request, Response, NextFunction } from 'express';
import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class CreateVoteCommentValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { vote_id, message } = req.body;

        if (!isIdValid(vote_id, 'hash')) {
            throw new AppException('Vote id invalid!');
        }

        if (!message || message.length < 5 || message.length > 200) {
            throw new AppException('Message invalid!');
        }

        return next();
    }
}

export { CreateVoteCommentValidator };
