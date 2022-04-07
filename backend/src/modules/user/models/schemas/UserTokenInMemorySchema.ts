import { IUserTokenSchema } from '@modules/user/models/schemas/IUserTokenSchema';

class UserTokenInMemorySchema implements IUserTokenSchema {
    public _id: string;
    public user_id: string;
    public token: string;
    public created_at: Date;
    public updated_at: Date;
}

export { UserTokenInMemorySchema };
