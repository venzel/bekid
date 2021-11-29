import { Router } from 'express';

import { CreateGroupMiddleware } from '@modules/group/useCases/CreateGroup/CreateGroupMiddleware';
import { SaveGroupUserMiddleware } from '@modules/group/useCases/SaveGroupUser/SaveGroupUserMiddleware';
import { UpdateGroupMiddleware } from '@modules/group/useCases/UpdateGroup/UpdateGroupMiddleware';
import { ListGroupMiddleware } from '@modules/group/useCases/ListGroup/ListGroupMiddleware';
import { ShowGroupMiddleware } from '@modules/group/useCases/ShowGroup/ShowGroupMiddleware';
import { DeleteGroupMiddleware } from '@modules/group/useCases/DeleteGroup/DeleteGroupMiddleware';

class GroupRoutes {
    public registerAll(router: Router): void {
        // Create
        new CreateGroupMiddleware().register(router, 'post', 'MANAGER', '/groups');

        // Create
        new SaveGroupUserMiddleware().register(router, 'post', 'MANAGER', '/save_group');

        // Update
        new UpdateGroupMiddleware().register(router, 'put', 'MANAGER', '/groups/:id');

        // List
        new ListGroupMiddleware().register(router, 'get', ['MANAGER', 'ADMIN'], '/groups');

        // Show
        new ShowGroupMiddleware().register(router, 'get', ['MANAGER', 'ADMIN'], '/groups/:id');

        // Delete
        new DeleteGroupMiddleware().register(router, 'delete', 'MANAGER', '/groups/:id');
    }
}

export { GroupRoutes };
