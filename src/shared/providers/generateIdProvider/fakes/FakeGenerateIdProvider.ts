import { IGenerateIdProvider } from '../model/IGenerateIdProvider';

class FakeGenerateIdProvider implements IGenerateIdProvider {
    public generateId(): string {
        const min = 1,
            max = 1000;

        const random: string = (min + Math.floor((max - min) * Math.random())).toString();

        return random;
    }
}

export { FakeGenerateIdProvider };
