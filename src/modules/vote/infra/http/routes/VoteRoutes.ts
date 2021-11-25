import { Router } from 'express';
import { CreateVoteMiddleware } from '@modules/vote/useCases/CreateVote/CreateVoteMiddleware';
// import { ShowVoteMiddleware } from '@modules/vote/useCases/ShowVote/ShowVoteMiddleware';
// import { UpdateVoteMiddleware } from '@modules/vote/useCases/UpdateVote/UpdateVoteMiddleware';
// import { DeleteVoteMiddleware } from '@modules/vote/useCases/DeleteVote/DeleteVoteMiddleware';
// import { ListVoteMiddleware } from '@modules/vote/useCases/ListVote/ListVoteMiddleware';

class VoteRoutes {
    public registerAll(router: Router): void {
        // Create
        new CreateVoteMiddleware().register(router, 'get', '/votes');

        // // Update
        // new UpdateVoteMiddleware().register(router, 'put', '/votes/:id');

        // // List
        // new ListVoteMiddleware().register(router, 'get', '/votes');

        // // Show
        // new ShowVoteMiddleware().register(router, 'get', '/votes/:id');
    }
}

export { VoteRoutes };
