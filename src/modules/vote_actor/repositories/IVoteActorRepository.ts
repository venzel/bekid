import { IVoteActorEntity } from '@modules/vote_actor/models/entities/IVoteActorEntity';
import { ICreateVoteActorDTO } from '@modules/vote_actor/dtos/ICreateVoteActorDTO';

interface IVoteActorRepository {
    findOneById(voteActorId: string): Promise<IVoteActorEntity | undefined>;

    create(data: ICreateVoteActorDTO): Promise<IVoteActorEntity>;

    save(voteActor: IVoteActorEntity): Promise<IVoteActorEntity>;

    delete(voteActor: IVoteActorEntity): Promise<IVoteActorEntity>;

    list(): Promise<IVoteActorEntity[]>;
}

export { IVoteActorRepository };
