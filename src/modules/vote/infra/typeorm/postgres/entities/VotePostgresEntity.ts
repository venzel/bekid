import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { IVoteEntity } from '@modules/vote/models/entities/IVoteEntity';
import { CampaignPostgresEntity } from '@modules/campaign/infra/typeorm/postgres/entities/CampaignPostgresEntity';
import { EmotionPostgresEntity } from '@modules/emotion/infra/typeorm/postgres/entities/EmotionPostgresEntity';
import { UserPostgresEntity } from '@modules/user/infra/typeorm/postgres/entities/UserPostgresEntity';

@Entity('votes')
class VotePostgresEntity implements IVoteEntity {
    @Expose({ name: 'vote_id' })
    @PrimaryColumn()
    public id: string;

    @Column()
    public campaign_id: string;

    @ManyToOne(() => CampaignPostgresEntity)
    @JoinColumn({ name: 'campaign_id' })
    public campaign: CampaignPostgresEntity;

    @Column()
    public emotion_id: string;

    @ManyToOne(() => EmotionPostgresEntity)
    @JoinColumn({ name: 'emotion_id' })
    public emotion: EmotionPostgresEntity;

    @Column()
    public user_id: string;

    // @ManyToOne(() => UserPostgresEntity, { lazy: true })
    @ManyToOne(() => UserPostgresEntity)
    @JoinColumn({ name: 'user_id' })
    public user: UserPostgresEntity;

    @CreateDateColumn()
    public created_at: Date;
}

export { VotePostgresEntity };
