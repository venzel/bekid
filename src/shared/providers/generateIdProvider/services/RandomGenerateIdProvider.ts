import { IGenerateIdProvider } from '../model/IGenerateIdProvider';

class RandomGenerateIdProvider implements IGenerateIdProvider {
    public generateId(): string {
        const min = 1,
            max = 1000;

        const random: string = (min + Math.floor((max - min) * Math.random())).toString();

        const timestamp: string = Date.now().toString();

        return random + timestamp;
    }
}

export { RandomGenerateIdProvider };
