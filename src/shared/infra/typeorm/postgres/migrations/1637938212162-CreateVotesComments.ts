import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateVotesComments1637938212162 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'votes_comments',
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
            'votes_comments',
            new TableForeignKey({
                name: 'FKVoteCommentVote',
                referencedTableName: 'votes',
                referencedColumnNames: ['id'],
                columnNames: ['vote_id'],
                onDelete: 'SET NULL',
                onUpdate: 'SET NULL',
            })
        );

        await queryRunner.createForeignKey(
            'votes_comments',
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
        await queryRunner.dropForeignKey('votes_comments', 'FKVoteUser');

        await queryRunner.dropForeignKey('votes_comments', 'FKVoteCommentVote');

        await queryRunner.dropTable('votes_comments');
    }
}
