import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { UpdateCampaignValidator } from './UpdateCampaignValidator';
import { UpdateCampaignController } from './UpdateCampaignController';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class UpdateCampaignMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new UpdateCampaignValidator();
        const { handle } = new UpdateCampaignController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { UpdateCampaignMiddleware };
