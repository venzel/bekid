import { Router } from 'express';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { UpdateEmotionValidator } from './UpdateEmotionValidator';
import { UpdateEmotionController } from './UpdateEmotionController';

class UpdateEmotionMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new UpdateEmotionValidator();
        const { handle } = new UpdateEmotionController();

        router[method](path, authenticate, role(['ADMIN']), validate, handle);
    }
}

export { UpdateEmotionMiddleware };
