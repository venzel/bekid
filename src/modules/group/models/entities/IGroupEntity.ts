import { IUserEntity } from '@modules/user/models/entities/IUserEntity';

interface IGroupEntity {
    id: string;
    user_id: string;
    users: IUserEntity[];
    name: string;
    created_at: Date;
    updated_at: Date;
}

export { IGroupEntity };
