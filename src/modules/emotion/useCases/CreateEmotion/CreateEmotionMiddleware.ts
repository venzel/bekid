import { Router } from 'express';
import { CreateEmotionValidator } from './CreateEmotionValidator';
import { CreateEmotionController } from './CreateEmotionController';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';

class CreateEmotionMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new CreateEmotionValidator();
        const { handle } = new CreateEmotionController();

        router[method](path, authenticate, role(['ADMIN']), validate, handle);
    }
}

export { CreateEmotionMiddleware };
