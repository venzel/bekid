import { Router } from 'express';
import { CreateVoteMiddleware } from '@modules/vote/useCases/CreateVote/CreateVoteMiddleware';
import { ListVoteMiddleware } from '@modules/vote/useCases/ListVote/ListVoteMiddleware';
// import { ShowVoteMiddleware } from '@modules/vote/useCases/ShowVote/ShowVoteMiddleware';

class VoteRoutes {
    public registerAll(router: Router): void {
        // Create
        new CreateVoteMiddleware().register(router, 'put', '/votes');

        // List
        new ListVoteMiddleware().register(router, 'get', '/votes');

        // // Show
        // new ShowVoteMiddleware().register(router, 'get', '/votes/:id');
    }
}

export { VoteRoutes };
