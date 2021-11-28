import { Router } from 'express';

import { ListEmotionMiddleware } from '@modules/emotion/useCases/ListEmotion/ListEmotionMiddleware';
import { ShowEmotionMiddleware } from '@modules/emotion/useCases/ShowEmotion/ShowEmotionMiddleware';
import { CreateEmotionMiddleware } from '@modules/emotion/useCases/CreateEmotion/CreateEmotionMiddleware';
import { UpdateEmotionMiddleware } from '@modules/emotion/useCases/UpdateEmotion/UpdateEmotionMiddleware';
import { DeleteEmotionMiddleware } from '@modules/emotion/useCases/DeleteEmotion/DeleteEmotionMiddleware';

class EmotionRoutes {
    public registerAll(router: Router): void {
        // Create
        new CreateEmotionMiddleware().register(router, 'post', '/emotions');

        // Update
        new UpdateEmotionMiddleware().register(router, 'put', '/emotions/:id');

        // List
        new ListEmotionMiddleware().register(router, 'get', '/emotions');

        // Show
        new ShowEmotionMiddleware().register(router, 'get', '/emotions/:id');

        // Delete
        new DeleteEmotionMiddleware().register(router, 'delete', '/emotions/:id');
    }
}

export { EmotionRoutes };
