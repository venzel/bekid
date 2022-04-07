import { Router } from 'express';

import { CreateVoteActorMiddleware } from '@modules/vote_actor/useCases/CreateVoteActor/CreateVoteActorMiddleware';
import { ListVoteActorMiddleware } from '@modules/vote_actor/useCases/ListVoteActor/ListVoteActorMiddleware';

class VoteActorRoutes {
    public registerAll(router: Router): void {
        // Create
        new CreateVoteActorMiddleware().register(router, 'put', 'USER', '/votes_actors');

        // List
        new ListVoteActorMiddleware().register(router, 'get', 'USER', '/votes_actors');
    }
}

export { VoteActorRoutes };
