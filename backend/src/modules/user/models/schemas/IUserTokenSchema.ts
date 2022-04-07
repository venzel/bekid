interface IUserTokenSchema {
    _id: any;
    user_id: string;
    token: string;
    created_at: Date;
    updated_at: Date;
}

export { IUserTokenSchema };
