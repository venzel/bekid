class AppException {
    public readonly message: string;
    public readonly code: number;

    constructor(message?: string, code?: number) {
        this.message = message || 'Error by user!';

        this.code = code || 400;
    }
}

export { AppException };
