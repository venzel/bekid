import { Router } from 'express';

import { ListEmotionMiddleware } from '@modules/emotion/useCases/ListEmotion/ListEmotionMiddleware';
import { ShowEmotionMiddleware } from '@modules/emotion/useCases/ShowEmotion/ShowEmotionMiddleware';
import { CreateEmotionMiddleware } from '@modules/emotion/useCases/CreateEmotion/CreateEmotionMiddleware';
import { UpdateEmotionMiddleware } from '@modules/emotion/useCases/UpdateEmotion/UpdateEmotionMiddleware';
import { DeleteEmotionMiddleware } from '@modules/emotion/useCases/DeleteEmotion/DeleteEmotionMiddleware';

class EmotionRoutes {
    public registerAll(router: Router): void {
        // Create
        new CreateEmotionMiddleware().register(router, 'post', 'ADMIN', '/emotions');

        // Update
        new UpdateEmotionMiddleware().register(router, 'put', 'ADMIN', '/emotions');

        // List
        new ListEmotionMiddleware().register(router, 'get', 'ADMIN', '/emotions');

        // Show
        new ShowEmotionMiddleware().register(router, 'get', 'ADMIN', '/emotions/:id');

        // Delete
        new DeleteEmotionMiddleware().register(router, 'delete', 'ADMIN', '/emotions/:id');
    }
}

export { EmotionRoutes };
