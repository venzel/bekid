import { Router } from 'express';

import { CreateVoteReasonMiddleware } from '@modules/vote_reason/useCases/CreateVoteReason/CreateVoteReasonMiddleware';
import { ListVoteReasonMiddleware } from '@modules/vote_reason/useCases/ListVoteReason/ListVoteReasonMiddleware';

class VoteReasonRoutes {
    public registerAll(router: Router): void {
        // Create
        new CreateVoteReasonMiddleware().register(router, 'put', 'USER', '/votes_reasons');

        // List
        new ListVoteReasonMiddleware().register(router, 'get', 'USER', '/votes_reasons');
    }
}

export { VoteReasonRoutes };
