import { Request, Response, NextFunction } from 'express';
import { AppException } from '@shared/exceptions/AppException';

class CreateEmotionValidator {
    public validate(req: Request, _: Response, next: NextFunction): any {
        const { name, slug } = req.body;

        if (!name || name.length < 3 || name.length > 15) {
            throw new AppException('Emotion name invalid!', 400);
        }

        if (!slug || slug.length < 3 || slug.length > 15) {
            throw new AppException('Emotion slug invalid!', 400);
        }

        return next();
    }
}

export { CreateEmotionValidator };
