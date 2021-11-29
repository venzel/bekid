import { Router } from 'express';

import { AddOneUserInQueueMiddleware } from '@modules/group_queue/useCases/AddOneUserInQueueGroup/AddOneUserInQueueMiddleware';
import { MonitoreGroupQueueMiddleware } from '@modules/group_queue/useCases/MonitoreGroupQueue/MonitoreGroupQueueMiddleware';

class GroupQueueRoutes {
    public registerAll(router: Router): void {
        // Create
        new AddOneUserInQueueMiddleware().register(router, 'get', 'MANAGER', '/add_one_user_group_queue');

        // Monitore
        new MonitoreGroupQueueMiddleware().register(router, 'get', 'USER', '/monitore_group_queue');
    }
}

export { GroupQueueRoutes };
