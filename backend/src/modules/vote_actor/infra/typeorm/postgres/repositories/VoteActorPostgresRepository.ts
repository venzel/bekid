import { getRepository, Repository } from 'typeorm';

import { ICreateVoteActorDTO } from '@modules/vote_actor/dtos/ICreateVoteActorDTO';
import { IVoteActorEntity } from '@modules/vote_actor/models/entities/IVoteActorEntity';
import { VoteActorPostgresEntity } from '../entities/VoteActorPostgresEntity';
import { IVoteActorRepository } from '@modules/vote_actor/repositories/IVoteActorRepository';

class VoteActorPostgresRepository implements IVoteActorRepository {
    private _repository: Repository<IVoteActorEntity>;

    constructor() {
        this._repository = getRepository(VoteActorPostgresEntity, 'default');
    }

    public async findOneById(voteActorId: string): Promise<IVoteActorEntity | undefined> {
        return await this._repository.findOne({ where: { id: voteActorId } });
    }

    public async findOneByCampaignId(campaignId: string): Promise<IVoteActorEntity | undefined> {
        return await this._repository.findOne({ where: { campaign_id: campaignId } });
    }

    public async findOneByEmotionId(emotionId: string): Promise<IVoteActorEntity | undefined> {
        return await this._repository.findOne({ where: { emotion_id: emotionId } });
    }

    public async findOneByUserId(userId: string): Promise<IVoteActorEntity | undefined> {
        return await this._repository.findOne({ where: { user_id: userId } });
    }

    public async create(data: ICreateVoteActorDTO): Promise<IVoteActorEntity> {
        const { vote_id, actor_id, user_token_id } = data;

        const voteActorCreated = this._repository.create({ vote_id, actor_id, user_id: user_token_id });

        await this._repository.save(voteActorCreated);

        return voteActorCreated;
    }

    public async save(voteActor: IVoteActorEntity): Promise<IVoteActorEntity> {
        await this._repository.save(voteActor);

        return voteActor;
    }

    public async delete(voteActor: IVoteActorEntity): Promise<IVoteActorEntity> {
        await this._repository.remove(voteActor);

        return voteActor;
    }

    public async list(): Promise<IVoteActorEntity[]> {
        return await this._repository.find({
            relations: ['vote', 'actor', 'user'],
        });
    }
}

export { VoteActorPostgresRepository };
