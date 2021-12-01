import { Router } from 'express';

import { UserRoutes } from '@modules/user/infra/http/routes/UserRoutes';
import { GroupRoutes } from '@modules/group/infra/http/routes/GroupRoutes';
import { GroupQueueRoutes } from '@modules/group_queue/infra/http/routes/GroupQueueRoutes';
import { EmotionRoutes } from '@modules/emotion/infra/http/routes/EmotionRoutes';
import { ActorRoutes } from '@modules/actor/infra/http/routes/ActorRoutes';
import { ReasonRoutes } from '@modules/reason/infra/http/routes/ReasonRoutes';
import { CampaignRoutes } from '@modules/campaign/infra/http/routes/CampaignRoutes';
import { CampaignQueueRoutes } from '@modules/campaign_queue/infra/http/routes/CampaignQueueRoutes';
import { VoteRoutes } from '@modules/vote/infra/http/routes/VoteRoutes';
import { VoteActorRoutes } from '@modules/vote_actor/infra/http/routes/VoteActorRoutes';
import { VoteReasonRoutes } from '@modules/vote_reason/infra/http/routes/VoteReasonRoutes';
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

        // ACTOR
        new ActorRoutes().registerAll(router);

        // REASON
        new ReasonRoutes().registerAll(router);

        // CAMPAIGN
        new CampaignRoutes().registerAll(router);

        // CAMPAIGN QUEUE
        new CampaignQueueRoutes().registerAll(router);

        // VOTE
        new VoteRoutes().registerAll(router);

        // VOTE ACTOR
        new VoteActorRoutes().registerAll(router);

        // VOTE REASON
        new VoteReasonRoutes().registerAll(router);

        // VOTE COMMENT
        new VoteCommentRoutes().registerAll(router);

        return router;
    }
}

const route = new Route();

export { route };
