import { IEmotionEntity } from '@modules/emotion/models/entities/IEmotionEntity';

class FakeEmotionEntity implements IEmotionEntity {
    id: string;
    name: string;
    slug: string;
    description: string;
    created_at: Date;
}

export { FakeEmotionEntity };
