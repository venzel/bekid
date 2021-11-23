import { Router } from 'express';
import { UserRoutes } from '@modules/user/infra/http/routes/UserRoutes';

class Route {
    public execute(): Router {
        const router: Router = Router();

        // USER
        new UserRoutes().registerAll(router);

        return router;
    }
}

const route = new Route();

export { route };
