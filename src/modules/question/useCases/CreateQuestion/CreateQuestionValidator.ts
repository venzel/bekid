import { Request, Response, NextFunction } from 'express';
import { AppException } from '@shared/exceptions/AppException';

class CreateQuestionValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { description } = req.body;

        if (!description || description.length < 3 || description.length > 15) {
            throw new AppException('Question name invalid!', 400);
        }

        return next();
    }
}

export { CreateQuestionValidator };
