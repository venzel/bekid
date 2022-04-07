interface IQueueProvider {
    subscribe(...services: any[]): void;
    enqueue(key: string, data: any): Promise<void>;
    process(): void;
}

export { IQueueProvider };
