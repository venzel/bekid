import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateVotesQuestions1637872646280 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'VOTES_QUESTIONS',
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
            'VOTES_QUESTIONS',
            new TableForeignKey({
                name: 'VoteQuestionVote',
                referencedTableName: 'VOTES',
                referencedColumnNames: ['id'],
                columnNames: ['vote_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'VOTES_QUESTIONS',
            new TableForeignKey({
                name: 'VoteQuestionQuestion',
                referencedTableName: 'QUESTIONS',
                referencedColumnNames: ['id'],
                columnNames: ['question_id'],
                onDelete: 'SET NULL',
                onUpdate: 'SET NULL',
            })
        );

        await queryRunner.createForeignKey(
            'VOTES_QUESTIONS',
            new TableForeignKey({
                name: 'VoteUser',
                referencedTableName: 'USERS',
                referencedColumnNames: ['id'],
                columnNames: ['user_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('VOTES_QUESTIONS');
    }
}
