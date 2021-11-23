interface IPayloadDTO {
    user: {
        user_id: string;
        role: string;
        activated: boolean;
    };
}

export { IPayloadDTO };
