import { Request, Response, NextFunction } from 'express';

import { idValidator } from '@shared/helpers/helperIdService';
import { AppException } from '@shared/exceptions/AppException';

class UpdateEmotionValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { emotion_id, name, slug } = req.body;

        if (!idValidator(emotion_id)) {
            throw new AppException(`Emotion id ${emotion_id} invalid!`);
        }

        if (!name || name.length < 3 || name.length > 15) {
            throw new AppException(`Emotion name ${name} invalid!`, 400);
        }

        if (!slug || slug.length < 3 || slug.length > 15) {
            throw new AppException(`Emotion slug ${slug} invalid!`, 400);
        }

        return next();
    }
}

export { UpdateEmotionValidator };
