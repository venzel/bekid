import { v4 as uuid } from 'uuid';
import { ICreateVoteCommentDTO } from '@modules/vote_comment/dtos/ICreateVoteCommentDTO';
import { IVoteCommentEntity } from '@modules/vote_comment/models/entities/IVoteCommentEntity';
import { IVoteCommentRepository } from '@modules/vote_comment/repositories/IVoteCommentRepository';
import { VoteCommentInMemoryEntity } from '../models/entities/VoteCommentInMemoryEntity';

class VoteCommentInMemoryRepository implements IVoteCommentRepository {
    private _repository: IVoteCommentEntity[];

    constructor() {
        this._repository = [];
    }

    public async findOneById(voteCommentId: string): Promise<IVoteCommentEntity | undefined> {
        return this._repository.find((data) => data.id === voteCommentId);
    }

    public async create(data: ICreateVoteCommentDTO): Promise<IVoteCommentEntity> {
        const { vote_id, user_id, message } = data;

        const voteCommentInMemoryEntity = new VoteCommentInMemoryEntity();

        const id = uuid();

        Object.assign(voteCommentInMemoryEntity, { id, vote_id, user_id, message });

        this._repository.push(voteCommentInMemoryEntity);

        return voteCommentInMemoryEntity;
    }

    public async save(voteComment: IVoteCommentEntity): Promise<IVoteCommentEntity> {
        const voteCommentIndex: number = this._repository.indexOf(voteComment);

        if (voteCommentIndex !== -1) {
            this._repository[voteCommentIndex] = voteComment;
        }

        return voteComment;
    }

    public async delete(voteComment: IVoteCommentEntity): Promise<IVoteCommentEntity> {
        const voteCommentIndex: number = this._repository.indexOf(voteComment);

        if (voteCommentIndex !== -1) {
            this._repository.splice(voteCommentIndex, 1);
        }

        return voteComment;
    }

    public async list(): Promise<IVoteCommentEntity[]> {
        return this._repository;
    }
}

export { VoteCommentInMemoryRepository };
