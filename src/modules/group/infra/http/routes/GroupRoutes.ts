import { Router } from 'express';

import { CreateGroupMiddleware } from '@modules/group/useCases/CreateGroup/CreateGroupMiddleware';
import { CreateGroupUserMiddleware } from '@modules/group/useCases/CreateGroupUser/CreateGroupUserMiddleware';
import { UpdateGroupMiddleware } from '@modules/group/useCases/UpdateGroup/UpdateGroupMiddleware';
import { ListGroupMiddleware } from '@modules/group/useCases/ListGroup/ListGroupMiddleware';
import { ShowGroupMiddleware } from '@modules/group/useCases/ShowGroup/ShowGroupMiddleware';
import { DeleteGroupMiddleware } from '@modules/group/useCases/DeleteGroup/DeleteGroupMiddleware';

class GroupRoutes {
    public registerAll(router: Router): void {
        // Create
        new CreateGroupMiddleware().register(router, 'post', '/groups');

        // Create
        new CreateGroupUserMiddleware().register(router, 'post', '/groups_users');

        // Update
        new UpdateGroupMiddleware().register(router, 'put', '/groups/:id');

        // List
        new ListGroupMiddleware().register(router, 'get', '/groups');

        // Show
        new ShowGroupMiddleware().register(router, 'get', '/groups/:id');

        // Delete
        new DeleteGroupMiddleware().register(router, 'delete', '/groups/:id');
    }
}

export { GroupRoutes };
