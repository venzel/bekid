import { IReasonEntity } from '@modules/reason/models/entities/IReasonEntity';

class ReasonInMemoryEntity implements IReasonEntity {
    id: string;
    emotion_id: string;
    description: string;
    created_at: Date;
}

export { ReasonInMemoryEntity };
