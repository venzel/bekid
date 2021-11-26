import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { IVoteCommentEntity } from '@modules/vote_comment/models/entities/IVoteCommentEntity';
import { VotePostgresEntity } from '@modules/vote/infra/typeorm/postgres/entities/VotePostgresEntity';
import { UserPostgresEntity } from '@modules/user/infra/typeorm/postgres/entities/UserPostgresEntity';
import { GenerateId } from '@shared/providers/GenerateIdProvider/GenarateId';

@Entity('VOTES_COMMENTS')
class VoteCommentPostgresEntity implements IVoteCommentEntity {
    @PrimaryColumn()
    public id: string;

    @Column()
    public vote_id: string;

    @ManyToOne(() => VotePostgresEntity)
    @JoinColumn({ name: 'vote_id' })
    public vote: VotePostgresEntity;

    @Column()
    public user_id: string;

    @ManyToOne(() => UserPostgresEntity)
    @JoinColumn({ name: 'user_id' })
    public user: UserPostgresEntity;

    @Column()
    public message: string;

    @CreateDateColumn()
    public created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = GenerateId.strategy('hash');
        }
    }
}

export { VoteCommentPostgresEntity };
