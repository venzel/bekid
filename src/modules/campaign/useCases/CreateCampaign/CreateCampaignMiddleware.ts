import { Router } from 'express';

import { CreateCampaignValidator } from './CreateCampaignValidator';
import { CreateCampaignController } from './CreateCampaignController';
import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';

class CreateCampaignMiddleware {
    public register(router: Router, method: method, path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { role } = new RoleUserMiddleware();
        const { validate } = new CreateCampaignValidator();
        const { handle } = new CreateCampaignController();

        router[method](path, authenticate, role(['ADMIN']), validate, handle);
    }
}

export { CreateCampaignMiddleware };
