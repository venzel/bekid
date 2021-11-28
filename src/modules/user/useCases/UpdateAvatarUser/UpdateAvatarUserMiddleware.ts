import { Router } from 'express';
import multer from 'multer';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { UpdateAvatarUserController } from './UpdateAvatarUserController';
import options from '@configs/storage';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class UpdateAvatarUserMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string) {
        const upload = multer(options);

        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { handle } = new UpdateAvatarUserController();

        router[method](path, authenticate, role(roles), upload.single('avatar'), handle);
    }
}

export { UpdateAvatarUserMiddleware };
