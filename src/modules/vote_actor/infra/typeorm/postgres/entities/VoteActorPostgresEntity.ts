import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { IVoteActorEntity } from '@modules/vote_actor/models/entities/IVoteActorEntity';
import { VotePostgresEntity } from '@modules/vote/infra/typeorm/postgres/entities/VotePostgresEntity';
import { ActorPostgresEntity } from '@modules/actor/infra/typeorm/postgres/entities/ActorPostgresEntity';
import { UserPostgresEntity } from '@modules/user/infra/typeorm/postgres/entities/UserPostgresEntity';
import { GenerateId } from '@shared/providers/GenerateIdProvider/GenarateId';

@Entity('votes_actors')
class VoteActorPostgresEntity implements IVoteActorEntity {
    @PrimaryColumn()
    public id: string;

    @Column()
    public vote_id: string;

    @ManyToOne(() => VotePostgresEntity)
    @JoinColumn({ name: 'vote_id' })
    public vote: VotePostgresEntity;

    @Column()
    public actor_id: string;

    @ManyToOne(() => ActorPostgresEntity)
    @JoinColumn({ name: 'actor_id' })
    public actor: ActorPostgresEntity;

    @Column()
    public user_id: string;

    @ManyToOne(() => UserPostgresEntity)
    @JoinColumn({ name: 'user_id' })
    public user: UserPostgresEntity;

    @CreateDateColumn()
    public created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = GenerateId.strategy();
        }
    }
}

export { VoteActorPostgresEntity };
