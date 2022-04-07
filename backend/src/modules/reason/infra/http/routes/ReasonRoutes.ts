import { Router } from 'express';

import { ShowReasonMiddleware } from '@modules/reason/useCases/ShowReason/ShowReasonMiddleware';
import { CreateReasonMiddleware } from '@modules/reason/useCases/CreateReason/CreateReasonMiddleware';
import { UpdateReasonMiddleware } from '@modules/reason/useCases/UpdateReason/UpdateReasonMiddleware';
import { DeleteReasonMiddleware } from '@modules/reason/useCases/DeleteReason/DeleteReasonMiddleware';
import { ListReasonMiddleware } from '@modules/reason/useCases/ListReason/ListReasonMiddleware';

class ReasonRoutes {
    public registerAll(router: Router): void {
        // Create
        new CreateReasonMiddleware().register(router, 'post', 'ADMIN', '/reasons');

        // Update
        new UpdateReasonMiddleware().register(router, 'put', 'ADMIN', '/reasons');

        // List
        new ListReasonMiddleware().register(router, 'get', 'ADMIN', '/reasons');

        // Show
        new ShowReasonMiddleware().register(router, 'get', 'ADMIN', '/reasons/:id');

        // Delete
        new DeleteReasonMiddleware().register(router, 'delete', 'ADMIN', '/reasons/:id');
    }
}

export { ReasonRoutes };
