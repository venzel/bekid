import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

import { IQuestionEntity } from '@modules/question/models/entities/IQuestionEntity';
import { GenerateId } from '@shared/providers/GenerateIdProvider/GenarateId';

@Entity('QUESTIONS')
class QuestionPostgresEntity implements IQuestionEntity {
    @PrimaryColumn()
    public id: string;

    @Column()
    public description: string;

    @CreateDateColumn()
    public created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = GenerateId.strategy('hash');
        }
    }
}

export { QuestionPostgresEntity };
