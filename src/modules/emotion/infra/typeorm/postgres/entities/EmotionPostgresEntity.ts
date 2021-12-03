import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

import { IEmotionEntity } from '@modules/emotion/models/entities/IEmotionEntity';
import { idGenerator } from '@shared/helpers/helperIdService';

@Entity('emotions')
class EmotionPostgresEntity implements IEmotionEntity {
    @PrimaryColumn()
    public id: string;

    @Column()
    public name: string;

    @Column()
    public slug: string;

    @CreateDateColumn()
    public created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = idGenerator();
        }
    }
}

export { EmotionPostgresEntity };
