import { Router } from 'express';
import { UserRoutes } from '@modules/user/infra/http/routes/UserRoutes';
import { EmotionRoutes } from '@modules/emotion/infra/http/routes/EmotionRoutes';

class Route {
    public execute(): Router {
        const router: Router = Router();

        // USER
        new UserRoutes().registerAll(router);

        // EMOTION
        new EmotionRoutes().registerAll(router);

        return router;
    }
}

const route = new Route();

export { route };
