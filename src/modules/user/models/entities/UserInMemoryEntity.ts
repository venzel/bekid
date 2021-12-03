import { IUserEntity } from '@modules/user/models/entities/IUserEntity';

class UserInMemoryEntity implements IUserEntity {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    avatar: string;
    slug: string;
    allowed: boolean;
    activated: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}

export { UserInMemoryEntity };
