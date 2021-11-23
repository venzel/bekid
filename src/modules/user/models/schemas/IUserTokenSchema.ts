interface IUserTokenSchema {
    _id: any;
    owner_id: string;
    token: string;
    created_at: Date;
    updated_at: Date;
}

export { IUserTokenSchema };
