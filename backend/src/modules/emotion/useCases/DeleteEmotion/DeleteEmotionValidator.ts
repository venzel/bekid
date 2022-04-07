import { Request, Response, NextFunction } from 'express';

import { idValidator } from '@shared/helpers/helperIdService';
import { AppException } from '@shared/exceptions/AppException';

class DeleteEmotionValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const emotionId = req.params.id;

        if (!idValidator(emotionId)) {
            throw new AppException(`Emotion id ${emotionId} invalid!`);
        }

        return next();
    }
}

export { DeleteEmotionValidator };
