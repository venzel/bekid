import { Entity, ObjectIdColumn, ObjectID, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { IUserTokenSchema } from '@modules/user/models/schemas/IUserTokenSchema';

@Entity('user_tokens')
class MongoUserTokenSchema implements IUserTokenSchema {
    @Expose({ name: 'token_user_Id' })
    @ObjectIdColumn()
    public _id: ObjectID;

    @Column()
    public owner_id: string;

    @Column()
    public token: string;

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;
}

export { MongoUserTokenSchema };
