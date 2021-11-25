import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
import { IQuestionEntity } from '@modules/question/models/entities/IQuestionEntity';
import { Expose } from 'class-transformer';

@Entity('QUESTIONS')
class QuestionPostgresEntity implements IQuestionEntity {
    @Expose({ name: 'question_id' })
    @PrimaryColumn()
    public id: string;

    @Column()
    public description: string;

    @CreateDateColumn()
    public created_at: Date;
}

export { QuestionPostgresEntity };
