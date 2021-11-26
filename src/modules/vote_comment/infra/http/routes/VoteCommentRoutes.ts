import { Router } from 'express';
import { CreateVoteCommentMiddleware } from '@modules/vote_comment/useCases/CreateVoteComment/CreateVoteCommentMiddleware';
import { ListVoteCommentMiddleware } from '@modules/vote_comment/useCases/ListVoteComment/ListVoteCommentMiddleware';

class VoteCommentRoutes {
    public registerAll(router: Router): void {
        // Create
        new CreateVoteCommentMiddleware().register(router, 'post', '/votes_comments');

        // List
        new ListVoteCommentMiddleware().register(router, 'get', '/votes_comments');
    }
}

export { VoteCommentRoutes };
