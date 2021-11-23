import { IUserTokenSchema } from '@modules/user/models/schemas/IUserTokenSchema';

class FakeUserTokenSchema implements IUserTokenSchema {
    public _id: string;
    public owner_id: string;
    public token: string;
    public created_at: Date;
    public updated_at: Date;
}

export { FakeUserTokenSchema };
