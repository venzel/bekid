interface IPayloadDTO {
    user: {
        owner_id: string;
        role: string;
        activated: boolean;
    };
}

export { IPayloadDTO };
