import { IEmotionEntity } from '@modules/emotion/models/entities/IEmotionEntity';

class EmotionInMemoryEntity implements IEmotionEntity {
    id: string;
    name: string;
    slug: string;
    created_at: Date;
}

export { EmotionInMemoryEntity };
