import { Router } from 'express';

import { ShowQuestionMiddleware } from '@modules/question/useCases/ShowQuestion/ShowQuestionMiddleware';
import { CreateQuestionMiddleware } from '@modules/question/useCases/CreateQuestion/CreateQuestionMiddleware';
import { UpdateQuestionMiddleware } from '@modules/question/useCases/UpdateQuestion/UpdateQuestionMiddleware';
import { DeleteQuestionMiddleware } from '@modules/question/useCases/DeleteQuestion/DeleteQuestionMiddleware';
import { ListQuestionMiddleware } from '@modules/question/useCases/ListQuestion/ListQuestionMiddleware';

class QuestionRoutes {
    public registerAll(router: Router): void {
        // Create
        new CreateQuestionMiddleware().register(router, 'post', 'ADMIN', '/questions');

        // Update
        new UpdateQuestionMiddleware().register(router, 'put', 'ADMIN', '/questions');

        // List
        new ListQuestionMiddleware().register(router, 'get', 'ADMIN', '/questions');

        // Show
        new ShowQuestionMiddleware().register(router, 'get', 'ADMIN', '/questions/:id');

        // Delete
        new DeleteQuestionMiddleware().register(router, 'delete', 'ADMIN', '/questions/:id');
    }
}

export { QuestionRoutes };
