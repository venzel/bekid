import { Router } from 'express';

import { AddOneUserInGroupQueueMiddleware } from '@modules/group_queue/useCases/AddOneUserInGroupQueue/AddOneUserInGroupQueueMiddleware';
import { MonitoreGroupQueueMiddleware } from '@modules/group_queue/useCases/MonitoreGroupQueue/MonitoreGroupQueueMiddleware';
import { DeleteOneUserInGroupQueueMiddleware } from '@modules/group_queue/useCases/DeleteOneUserInGroupQueue/DeleteOneUserInGroupQueueMiddleware';

class GroupQueueRoutes {
    public registerAll(router: Router): void {
        // Add one user in group queue
        new AddOneUserInGroupQueueMiddleware().register(router, 'get', 'MANAGER', '/add_one_user_in_group_queue');

        // Delete one user in group queue
        new DeleteOneUserInGroupQueueMiddleware().register(router, 'get', 'USER', '/delete_one_user_in_group_queue?:id');

        // Monitore
        new MonitoreGroupQueueMiddleware().register(router, 'get', 'USER', '/monitore_group_queue');
    }
}

export { GroupQueueRoutes };
