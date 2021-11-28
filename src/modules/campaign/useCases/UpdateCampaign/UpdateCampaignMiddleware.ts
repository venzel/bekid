import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { UpdateCampaignValidator } from './UpdateCampaignValidator';
import { UpdateCampaignController } from './UpdateCampaignController';

class UpdateCampaignMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new UpdateCampaignValidator();
        const { handle } = new UpdateCampaignController();

        router[method](path, authenticate, role(['ADMIN']), validate, handle);
    }
}

export { UpdateCampaignMiddleware };
