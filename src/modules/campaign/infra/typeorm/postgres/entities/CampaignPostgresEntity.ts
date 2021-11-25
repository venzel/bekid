import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { ICampaignEntity } from '@modules/campaign/models/entities/ICampaignEntity';
import { Expose } from 'class-transformer';

@Entity('campaigns')
class CampaignPostgresEntity implements ICampaignEntity {
    @Expose({ name: 'campaign_id' })
    @PrimaryColumn()
    public id: string;

    @Column()
    public name: string;

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;

    @DeleteDateColumn()
    public deleted_at: Date | null;
}

export { CampaignPostgresEntity };
