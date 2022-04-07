import { IActorEntity } from '@modules/actor/models/entities/IActorEntity';

class ActorInMemoryEntity implements IActorEntity {
    id: string;
    name: string;
    slug: string;
    created_at: Date;
}

export { ActorInMemoryEntity };
