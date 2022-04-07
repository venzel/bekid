import { v4 as uuid } from 'uuid';

import { ICreateVoteActorDTO } from '@modules/vote_actor/dtos/ICreateVoteActorDTO';
import { IVoteActorEntity } from '@modules/vote_actor/models/entities/IVoteActorEntity';
import { IVoteActorRepository } from '@modules/vote_actor/repositories/IVoteActorRepository';
import { VoteActorInMemoryEntity } from '../models/entities/VoteActorInMemoryEntity';

class VoteActorInMemoryRepository implements IVoteActorRepository {
    private _repository: IVoteActorEntity[];

    constructor() {
        this._repository = [];
    }

    public async findOneById(voteActorId: string): Promise<IVoteActorEntity | undefined> {
        return this._repository.find((data) => data.id === voteActorId);
    }

    public async create(data: ICreateVoteActorDTO): Promise<IVoteActorEntity> {
        const { vote_id, actor_id, user_token_id } = data;

        const voteActorInMemoryEntity = new VoteActorInMemoryEntity();

        const id = uuid();

        Object.assign(voteActorInMemoryEntity, { id, vote_id, actor_id, user_id: user_token_id });

        this._repository.push(voteActorInMemoryEntity);

        return voteActorInMemoryEntity;
    }

    public async save(voteActor: IVoteActorEntity): Promise<IVoteActorEntity> {
        const voteActorIndex: number = this._repository.indexOf(voteActor);

        if (voteActorIndex !== -1) {
            this._repository[voteActorIndex] = voteActor;
        }

        return voteActor;
    }

    public async delete(voteActor: IVoteActorEntity): Promise<IVoteActorEntity> {
        const voteActorIndex: number = this._repository.indexOf(voteActor);

        if (voteActorIndex !== -1) {
            this._repository.splice(voteActorIndex, 1);
        }

        return voteActor;
    }

    public async list(): Promise<IVoteActorEntity[]> {
        return this._repository;
    }
}

export { VoteActorInMemoryRepository };
