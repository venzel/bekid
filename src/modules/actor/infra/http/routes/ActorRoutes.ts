import { Router } from 'express';

import { ListActorMiddleware } from '@modules/actor/useCases/ListActor/ListActorMiddleware';
import { ShowActorMiddleware } from '@modules/actor/useCases/ShowActor/ShowActorMiddleware';
import { CreateActorMiddleware } from '@modules/actor/useCases/CreateActor/CreateActorMiddleware';
import { UpdateActorMiddleware } from '@modules/actor/useCases/UpdateActor/UpdateActorMiddleware';
import { DeleteActorMiddleware } from '@modules/actor/useCases/DeleteActor/DeleteActorMiddleware';

class ActorRoutes {
    public registerAll(router: Router): void {
        // Create
        new CreateActorMiddleware().register(router, 'post', 'ADMIN', '/actors');

        // Update
        new UpdateActorMiddleware().register(router, 'put', 'ADMIN', '/actors');

        // List
        new ListActorMiddleware().register(router, 'get', 'ADMIN', '/actors');

        // Show
        new ShowActorMiddleware().register(router, 'get', 'ADMIN', '/actors/:id');

        // Delete
        new DeleteActorMiddleware().register(router, 'delete', 'ADMIN', '/actors/:id');
    }
}

export { ActorRoutes };
