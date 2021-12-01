import { v4 as uuid } from 'uuid';

import { ICreateVoteReasonDTO } from '@modules/vote_reason/dtos/ICreateVoteReasonDTO';
import { IVoteReasonEntity } from '@modules/vote_reason/models/entities/IVoteReasonEntity';
import { IVoteReasonRepository } from '@modules/vote_reason/repositories/IVoteReasonRepository';
import { VoteReasonInMemoryEntity } from '../models/entities/VoteReasonInMemoryEntity';

class VoteReasonInMemoryRepository implements IVoteReasonRepository {
    private _repository: IVoteReasonEntity[];

    constructor() {
        this._repository = [];
    }

    public async findOneById(voteReasonId: string): Promise<IVoteReasonEntity | undefined> {
        return this._repository.find((data) => data.id === voteReasonId);
    }

    public async create(data: ICreateVoteReasonDTO): Promise<IVoteReasonEntity> {
        const { vote_id, reason_id, user_token_id } = data;

        const voteReasonInMemoryEntity = new VoteReasonInMemoryEntity();

        const id = uuid();

        Object.assign(voteReasonInMemoryEntity, { id, vote_id, reason_id, user_id: user_token_id });

        this._repository.push(voteReasonInMemoryEntity);

        return voteReasonInMemoryEntity;
    }

    public async save(voteReason: IVoteReasonEntity): Promise<IVoteReasonEntity> {
        const voteReasonIndex: number = this._repository.indexOf(voteReason);

        if (voteReasonIndex !== -1) {
            this._repository[voteReasonIndex] = voteReason;
        }

        return voteReason;
    }

    public async delete(voteReason: IVoteReasonEntity): Promise<IVoteReasonEntity> {
        const voteReasonIndex: number = this._repository.indexOf(voteReason);

        if (voteReasonIndex !== -1) {
            this._repository.splice(voteReasonIndex, 1);
        }

        return voteReason;
    }

    public async list(): Promise<IVoteReasonEntity[]> {
        return this._repository;
    }
}

export { VoteReasonInMemoryRepository };
