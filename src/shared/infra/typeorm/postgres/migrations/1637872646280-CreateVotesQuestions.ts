import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateVotesQuestions1637872646280 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'votes_questions',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isUnique: true,
                        isPrimary: true,
                    },
                    {
                        name: 'vote_id',
                        type: 'varchar',
                    },
                    {
                        name: 'question_id',
                        type: 'varchar',
                    },
                    {
                        name: 'user_id',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        isNullable: false,
                        default: 'now()',
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            'votes_questions',
            new TableForeignKey({
                name: 'FKVoteQuestionVote',
                referencedTableName: 'votes',
                referencedColumnNames: ['id'],
                columnNames: ['vote_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'votes_questions',
            new TableForeignKey({
                name: 'FKVoteQuestionQuestion',
                referencedTableName: 'questions',
                referencedColumnNames: ['id'],
                columnNames: ['question_id'],
                onDelete: 'SET NULL',
                onUpdate: 'SET NULL',
            })
        );

        await queryRunner.createForeignKey(
            'votes_questions',
            new TableForeignKey({
                name: 'FKVoteUser',
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                columnNames: ['user_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('votes_questions', 'FKVoteUser');

        await queryRunner.dropForeignKey('votes_questions', 'FKVoteQuestionQuestion');

        await queryRunner.dropForeignKey('votes_questions', 'FKVoteQuestionVote');

        await queryRunner.dropTable('votes_questions');
    }
}
