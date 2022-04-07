interface IPayloadDTO {
    user: {
        user_token_id: string;
        user_token_role: string;
        user_token_activated: boolean;
    };
}

export { IPayloadDTO };
