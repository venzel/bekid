import { Request, Response, NextFunction } from 'express';

import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class CreateVoteQuestionValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const voteId = req.query.vote_id?.toString();

        const questionId = req.query.question_id?.toString();

        if (!isIdValid(voteId, 'hash')) {
            throw new AppException('Vote id invalid!');
        }

        if (!isIdValid(questionId, 'hash')) {
            throw new AppException('Question id invalid!');
        }

        return next();
    }
}

export { CreateVoteQuestionValidator };
