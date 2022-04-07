import { Router } from 'express';

import { CreateVoteMiddleware } from '@modules/vote/useCases/CreateVote/CreateVoteMiddleware';
import { ListVoteMiddleware } from '@modules/vote/useCases/ListVote/ListVoteMiddleware';
import { DeleteVoteMiddleware } from '@modules/vote/useCases/DeleteVote/DeleteVoteMiddleware';

class VoteRoutes {
    public registerAll(router: Router): void {
        // Create
        new CreateVoteMiddleware().register(router, 'put', 'USER', '/votes');

        // List
        new ListVoteMiddleware().register(router, 'get', 'USER', '/votes');

        // Delete
        new DeleteVoteMiddleware().register(router, 'delete', 'USER', '/votes/:id');
    }
}

export { VoteRoutes };
