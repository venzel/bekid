import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { ICampaignEntity } from '@modules/campaign/models/entities/ICampaignEntity';
import { GenerateId } from '@shared/providers/GenerateIdProvider/GenarateId';
import { UserPostgresEntity } from '@modules/user/infra/typeorm/postgres/entities/UserPostgresEntity';
import { GroupPostgresEntity } from '@modules/group/infra/typeorm/postgres/entities/GroupPostgresEntity';

@Entity('CAMPAIGNS')
class CampaignPostgresEntity implements ICampaignEntity {
    @PrimaryColumn()
    public id: string;

    @Column()
    public group_id: string;

    @ManyToOne(() => GroupPostgresEntity)
    @JoinColumn({ name: 'group_id' })
    public group: GroupPostgresEntity;

    @Expose({ name: 'owner_id' })
    @Column()
    public user_id: string;

    @ManyToOne(() => UserPostgresEntity)
    @JoinColumn({ name: 'user_id' })
    public user: UserPostgresEntity;

    @Column()
    public name: string;

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;

    @DeleteDateColumn()
    public deleted_at: Date | null;

    constructor() {
        if (!this.id) {
            this.id = GenerateId.strategy();
        }
    }
}

export { CampaignPostgresEntity };
