import { Router } from 'express';
import { CreateVoteQuestionMiddleware } from '@modules/vote_question/useCases/CreateVoteQuestion/CreateVoteQuestionMiddleware';
import { ListVoteQuestionMiddleware } from '@modules/vote_question/useCases/ListVoteQuestion/ListVoteQuestionMiddleware';

class VoteQuestionRoutes {
    public registerAll(router: Router): void {
        // Create
        new CreateVoteQuestionMiddleware().register(router, 'put', '/votes_questions');

        // List
        new ListVoteQuestionMiddleware().register(router, 'get', '/votes_questions');
    }
}

export { VoteQuestionRoutes };
