import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { IVoteQuestionEntity } from '@modules/vote_question/models/entities/IVoteQuestionEntity';
import { VotePostgresEntity } from '@modules/vote/infra/typeorm/postgres/entities/VotePostgresEntity';
import { QuestionPostgresEntity } from '@modules/question/infra/typeorm/postgres/entities/QuestionPostgresEntity';
import { UserPostgresEntity } from '@modules/user/infra/typeorm/postgres/entities/UserPostgresEntity';
import { GenerateId } from '@shared/providers/GenerateIdProvider/GenarateId';

@Entity('VOTES_QUESTIONS')
class VoteQuestionPostgresEntity implements IVoteQuestionEntity {
    @PrimaryColumn()
    public id: string;

    @Column()
    public vote_id: string;

    @ManyToOne(() => VotePostgresEntity)
    @JoinColumn({ name: 'vote_id' })
    public vote: VotePostgresEntity;

    @Column()
    public question_id: string;

    @ManyToOne(() => QuestionPostgresEntity)
    @JoinColumn({ name: 'question_id' })
    public question: QuestionPostgresEntity;

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

export { VoteQuestionPostgresEntity };
