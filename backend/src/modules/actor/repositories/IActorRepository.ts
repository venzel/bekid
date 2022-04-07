import { IActorEntity } from '@modules/actor/models/entities/IActorEntity';
import { ICreateActorDTO } from '../dtos/ICreateActorDTO';

interface IActorRepository {
    findOneById(actorId: string): Promise<IActorEntity | undefined>;

    findOneByName(name: string): Promise<IActorEntity | undefined>;

    create(data: ICreateActorDTO): Promise<IActorEntity>;

    save(actor: IActorEntity): Promise<IActorEntity>;

    delete(actor: IActorEntity): Promise<IActorEntity>;

    list(): Promise<IActorEntity[]>;
}

export { IActorRepository };
