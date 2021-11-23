import { Router } from 'express';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { DeleteEmotionValidator } from './DeleteEmotionValidator';
import { DeleteEmotionController } from './DeleteEmotionController';

class DeleteEmotionMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new DeleteEmotionValidator();
        const { handle } = new DeleteEmotionController();

        router[method](path, authenticate, role(['ADMIN']), validate, handle);
    }
}

export { DeleteEmotionMiddleware };
