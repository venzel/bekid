import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';

import { IReasonEntity } from '@modules/reason/models/entities/IReasonEntity';
import { EmotionPostgresEntity } from '@modules/emotion/infra/typeorm/postgres/entities/EmotionPostgresEntity';
import { idGenerator } from '@shared/helpers/helperIdService';

@Entity('reasons')
class ReasonPostgresEntity implements IReasonEntity {
    @PrimaryColumn()
    public id: string;

    @Column()
    public emotion_id: string;

    @ManyToOne(() => EmotionPostgresEntity)
    @JoinColumn({ name: 'emotion_id' })
    public emotion: EmotionPostgresEntity;

    @Column()
    public description: string;

    @CreateDateColumn()
    public created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = idGenerator();
        }
    }
}

export { ReasonPostgresEntity };
