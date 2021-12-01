import { Router } from 'express';

import { UserRoutes } from '@modules/user/infra/http/routes/UserRoutes';
import { GroupRoutes } from '@modules/group/infra/http/routes/GroupRoutes';
import { GroupQueueRoutes } from '@modules/group_queue/infra/http/routes/GroupQueueRoutes';
import { EmotionRoutes } from '@modules/emotion/infra/http/routes/EmotionRoutes';
import { ActorRoutes } from '@modules/actor/infra/http/routes/ActorRoutes';
import { QuestionRoutes } from '@modules/reason/infra/http/routes/QuestionRoutes';
import { CampaignRoutes } from '@modules/campaign/infra/http/routes/CampaignRoutes';
import { CampaignQueueRoutes } from '@modules/campaign_queue/infra/http/routes/CampaignQueueRoutes';
import { VoteRoutes } from '@modules/vote/infra/http/routes/VoteRoutes';
import { VoteQuestionRoutes } from '@modules/vote_reason/infra/http/routes/VoteQuestionRoutes';
import { VoteCommentRoutes } from '@modules/vote_comment/infra/http/routes/VoteCommentRoutes';

class Route {
    public execute(): Router {
        const router: Router = Router();

        // USER
        new UserRoutes().registerAll(router);

        // GROUP
        new GroupRoutes().registerAll(router);

        // GROUP QUEUE
        new GroupQueueRoutes().registerAll(router);

        // EMOTION
        new EmotionRoutes().registerAll(router);

        // Actor
        new ActorRoutes().registerAll(router);

        // QUESTION
        new QuestionRoutes().registerAll(router);

        // CAMPAIGN
        new CampaignRoutes().registerAll(router);

        // CAMPAIGN QUEUE
        new CampaignQueueRoutes().registerAll(router);

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
