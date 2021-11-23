import { Router } from 'express';
import multer from 'multer';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { UpdateAvatarUserController } from './UpdateAvatarUserController';
import options from '../../../../configs/storage';

class UpdateAvatarUserMiddleware {
    public register(router: Router, method: method, path: string) {
        const upload = multer(options);

        const { authenticate } = new AuthenticateUserMiddleware();
        const { handle } = new UpdateAvatarUserController();

        router[method](path, authenticate, upload.single('avatar'), handle);
    }
}

export { UpdateAvatarUserMiddleware };
