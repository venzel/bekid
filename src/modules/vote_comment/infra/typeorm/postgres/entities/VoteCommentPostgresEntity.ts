import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { IVoteCommentEntity } from '@modules/vote_comment/models/entities/IVoteCommentEntity';
import { VotePostgresEntity } from '@modules/vote/infra/typeorm/postgres/entities/VotePostgresEntity';
import { UserPostgresEntity } from '@modules/user/infra/typeorm/postgres/entities/UserPostgresEntity';

@Entity('VOTES_COMMENTS')
class VoteCommentPostgresEntity implements IVoteCommentEntity {
    @Expose({ name: 'vote_comment_id' })
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
}

export { VoteCommentPostgresEntity };
