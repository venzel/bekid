import { Router } from 'express';
import { ShowQuestionMiddleware } from '@modules/question/useCases/ShowQuestion/ShowQuestionMiddleware';
import { CreateQuestionMiddleware } from '@modules/question/useCases/CreateQuestion/CreateQuestionMiddleware';
import { UpdateQuestionMiddleware } from '@modules/question/useCases/UpdateQuestion/UpdateQuestionMiddleware';
import { DeleteQuestionMiddleware } from '@modules/question/useCases/DeleteQuestion/DeleteQuestionMiddleware';
import { ListQuestionMiddleware } from '@modules/question/useCases/ListQuestion/ListQuestionMiddleware';

class QuestionRoutes {
    public registerAll(router: Router): void {
        // Create
        new CreateQuestionMiddleware().register(router, 'post', '/questions');

        // Update
        new UpdateQuestionMiddleware().register(router, 'put', '/questions/:id');

        // List
        new ListQuestionMiddleware().register(router, 'get', '/questions');

        // Show
        new ShowQuestionMiddleware().register(router, 'get', '/questions/:id');

        // Delete
        new DeleteQuestionMiddleware().register(router, 'delete', '/questions/:id');
    }
}

export { QuestionRoutes };
