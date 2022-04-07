import { IGroupQueueEntity } from './IGroupQueueEntity';

class GroupQueueInMemoryEntity implements IGroupQueueEntity {
    id: string;
    group_id: string;
    user_id: string;
    created_at: Date;
}

export { GroupQueueInMemoryEntity };
