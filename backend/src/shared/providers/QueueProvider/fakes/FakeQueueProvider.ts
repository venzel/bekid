import { IQueueProvider } from '../models/IQueueProvider';

class FakeQueueProvider implements IQueueProvider {
    public subscribe(...services: any[]): void {
        throw new Error('Method not implemented.');
    }

    public async enqueue(key: string, data: any): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public process(): void {
        throw new Error('Method not implemented.');
    }
}

export { FakeQueueProvider };
