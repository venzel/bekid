import { Router } from 'express';

import { AuthenticateUserMiddleware } from '@modules/user/middlewares/AuthenticateUserMiddleware';
import { MonitoreCampaignQueueValidator } from './MonitoreCampaignQueueValidator';
import { MonitoreCampaignQueueController } from './MonitoreCampaignQueueController';
import { RoleUserMiddleware } from '@modules/user/middlewares/RoleUserMiddleware';
import { IRoleDTO } from '@modules/user/dtos/IRoleDTO';

class MonitoreCampaignQueueMiddleware {
    public register(router: Router, method: method, roles: IRoleDTO | IRoleDTO[], path: string): void {
        const { authenticate } = new AuthenticateUserMiddleware();
        const { validate } = new MonitoreCampaignQueueValidator();
        const { role } = new RoleUserMiddleware();
        const { handle } = new MonitoreCampaignQueueController();

        router[method](path, authenticate, role(roles), validate, handle);
    }
}

export { MonitoreCampaignQueueMiddleware };
