import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
import { IEmotionEntity } from '@modules/emotion/models/entities/IEmotionEntity';
import { Expose } from 'class-transformer';

@Entity('emotions')
class PostgresEmotionEntity implements IEmotionEntity {
    @Expose({ name: 'emotion_id' })
    @PrimaryColumn()
    public id: string;

    @Column()
    public name: string;

    @Column()
    public slug: string;

    @Column()
    public description: string;

    @CreateDateColumn()
    public created_at: Date;
}

export { PostgresEmotionEntity };
