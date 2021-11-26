import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';

import { IQuestionEntity } from '@modules/question/models/entities/IQuestionEntity';
import { EmotionPostgresEntity } from '@modules/emotion/infra/typeorm/postgres/entities/EmotionPostgresEntity';
import { GenerateId } from '@shared/providers/GenerateIdProvider/GenarateId';

@Entity('QUESTIONS')
class QuestionPostgresEntity implements IQuestionEntity {
    @PrimaryColumn()
    public id: string;

    @Column()
    public description: string;

    @Column()
    public emotion_id: string;

    @ManyToOne(() => EmotionPostgresEntity)
    @JoinColumn({ name: 'emotion_id' })
    public emotion: EmotionPostgresEntity;

    @CreateDateColumn()
    public created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = GenerateId.strategy('hash');
        }
    }
}

export { QuestionPostgresEntity };
