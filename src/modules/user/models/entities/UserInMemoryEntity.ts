import { IUserEntity } from '@modules/user/models/entities/IUserEntity';

class UserInMemoryEntity implements IUserEntity {
    public id: string;
    public name: string;
    public email: string;
    public password: string;
    public role: string;
    public avatar: string;
    public allowed: boolean;
    public activated: boolean;
    public created_at: Date;
    public updated_at: Date;
    public deleted_at: Date | null;
}

export { UserInMemoryEntity };
