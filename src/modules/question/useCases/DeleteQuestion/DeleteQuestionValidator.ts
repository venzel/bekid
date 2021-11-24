import { Request, Response, NextFunction } from 'express';
import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class DeleteQuestionValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const questionId = req.params.id?.toString();

        if (!isIdValid(questionId, 'hash')) {
            throw new AppException('Question id invalid!');
        }

        return next();
    }
}

export { DeleteQuestionValidator };