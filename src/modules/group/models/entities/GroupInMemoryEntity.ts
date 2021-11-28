import { IGroupEntity } from './IGroupEntity';
import { IUserEntity } from '@modules/user/models/entities/IUserEntity';

class GroupInMemoryEntity implements IGroupEntity {
    id: string;
    user_id: string;
    users: IUserEntity[];
    name: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}

export { GroupInMemoryEntity };
