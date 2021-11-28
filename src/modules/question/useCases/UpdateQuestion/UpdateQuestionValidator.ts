import { Request, Response, NextFunction } from 'express';

import { AppException } from '@shared/exceptions/AppException';

class UpdateQuestionValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { description } = req.body;

        if (!description || description.length < 3 || description.length > 15) {
            throw new AppException(`Question description ${description} invalid!`, 400);
        }

        return next();
    }
}

export { UpdateQuestionValidator };
