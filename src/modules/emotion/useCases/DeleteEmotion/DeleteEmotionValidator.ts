import { Request, Response, NextFunction } from 'express';
import { isIdValid } from '@shared/helpers/validator';
import { AppException } from '@shared/exceptions/AppException';

class DeleteEmotionValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const emotionId = req.params.id?.toString();

        if (!isIdValid(emotionId, 'hash')) {
            throw new AppException('Emotion id invalid!');
        }

        return next();
    }
}

export { DeleteEmotionValidator };
