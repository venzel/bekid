import { Request, Response, NextFunction } from 'express';

import { ICreateVoteQuestionDTO } from '@modules/vote_question/dtos/ICreateVoteQuestionDTO';
import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class CreateVoteQuestionValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { vote_id, question_id } = req.query;

        const data = {
            vote_id,
            question_id,
        } as ICreateVoteQuestionDTO; // important, force typing in this case: QUERY STRING!

        if (!isIdValid(data.vote_id, 'hash')) {
            throw new AppException(`Vote id ${data.vote_id} invalid!`);
        }

        if (!isIdValid(data.question_id, 'hash')) {
            throw new AppException(`Question id ${data.question_id} invalid!`);
        }

        return next();
    }
}

export { CreateVoteQuestionValidator };
