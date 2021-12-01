import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';

import { ICampaignQueueEntity } from '@modules/campaign_queue/models/entities/ICampaignQueueEntity';
import { UserPostgresEntity } from '@modules/user/infra/typeorm/postgres/entities/UserPostgresEntity';
import { CampaignPostgresEntity } from '@modules/campaign/infra/typeorm/postgres/entities/CampaignPostgresEntity';
import { GenerateId } from '@shared/providers/GenerateIdProvider/GenarateId';

@Entity('campaing_queue')
class CampaignQueuePostgresEntity implements ICampaignQueueEntity {
    @PrimaryColumn()
    public id: string;

    @Column()
    public campaign_id: string;

    @ManyToOne(() => CampaignPostgresEntity)
    @JoinColumn({ name: 'campaign_id' })
    public group: CampaignPostgresEntity;

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

export { CampaignQueuePostgresEntity };
