import { IGroupEntity } from './IGroupEntity';

class GroupInMemoryEntity implements IGroupEntity {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}

export { GroupInMemoryEntity };
