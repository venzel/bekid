import { Router } from 'express';
import { ShowGroupMiddleware } from '@modules/group/useCases/ShowGroup/ShowGroupMiddleware';
import { CreateGroupMiddleware } from '@modules/group/useCases/CreateGroup/CreateGroupMiddleware';
import { UpdateGroupMiddleware } from '@modules/group/useCases/UpdateGroup/UpdateGroupMiddleware';
import { DeleteGroupMiddleware } from '@modules/group/useCases/DeleteGroup/DeleteGroupMiddleware';
import { ListGroupMiddleware } from '@modules/group/useCases/ListGroup/ListGroupMiddleware';

class GroupRoutes {
    public registerAll(router: Router): void {
        // Create
        new CreateGroupMiddleware().register(router, 'post', '/groups');

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
