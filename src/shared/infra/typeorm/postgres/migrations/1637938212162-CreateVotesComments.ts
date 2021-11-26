import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateVotesComments1637938212162 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'VOTES_COMMENTS',
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
                        name: 'user_id',
                        type: 'varchar',
                    },
                    {
                        name: 'message',
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
            'VOTES_COMMENTS',
            new TableForeignKey({
                name: 'VoteCommentVote',
                referencedTableName: 'VOTES',
                referencedColumnNames: ['id'],
                columnNames: ['vote_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'VOTES_COMMENTS',
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
        await queryRunner.dropTable('VOTES_COMMENTS');
    }
}
