import { Router } from 'express';
import { UserRoutes } from '@modules/user/infra/http/routes/UserRoutes';
import { EmotionRoutes } from '@modules/emotion/infra/http/routes/EmotionRoutes';
import { QuestionRoutes } from '@modules/question/infra/http/routes/QuestionRoutes';
import { GroupRoutes } from '@modules/group/infra/http/routes/GroupRoutes';
import { CampaignRoutes } from '@modules/campaign/infra/http/routes/CampaignRoutes';
import { VoteRoutes } from '@modules/vote/infra/http/routes/VoteRoutes';
import { VoteQuestionRoutes } from '@modules/vote_question/infra/http/routes/VoteQuestionRoutes';
import { VoteCommentRoutes } from '@modules/vote_comment/infra/http/routes/VoteCommentRoutes';

class Route {
    public execute(): Router {
        const router: Router = Router();

        // USER
        new UserRoutes().registerAll(router);

        // EMOTION
        new EmotionRoutes().registerAll(router);

        // QUESTION
        new QuestionRoutes().registerAll(router);

        // GROUP
        new GroupRoutes().registerAll(router);

        // CAMPAIGN
        new CampaignRoutes().registerAll(router);

        // VOTE
        new VoteRoutes().registerAll(router);

        // VOTE QUESTION
        new VoteQuestionRoutes().registerAll(router);

        // VOTE COMMENT
        new VoteCommentRoutes().registerAll(router);

        return router;
    }
}

const route = new Route();

export { route };
