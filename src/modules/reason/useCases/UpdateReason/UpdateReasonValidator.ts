import { Request, Response, NextFunction } from 'express';

import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class UpdateReasonValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { emotion_id, description } = req.body;

        if (!isIdValid(emotion_id, 'hash')) {
            throw new AppException('Emotion id invalid!');
        }

        if (!description || description.length < 3 || description.length > 15) {
            throw new AppException(`Reason description ${description} invalid!`, 400);
        }

        return next();
    }
}

export { UpdateReasonValidator };
