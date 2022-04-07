import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateVotesReasons1637872646280 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'votes_reasons',
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
                        name: 'reason_id',
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
            'votes_reasons',
            new TableForeignKey({
                name: 'FKVoteReasonVote',
                referencedTableName: 'votes',
                referencedColumnNames: ['id'],
                columnNames: ['vote_id'],
                onDelete: 'SET NULL',
                onUpdate: 'SET NULL',
            })
        );

        await queryRunner.createForeignKey(
            'votes_reasons',
            new TableForeignKey({
                name: 'FKVoteReasonReason',
                referencedTableName: 'reasons',
                referencedColumnNames: ['id'],
                columnNames: ['reason_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'votes_reasons',
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
        await queryRunner.dropForeignKey('votes_reasons', 'FKVoteUser');

        await queryRunner.dropForeignKey('votes_reasons', 'FKVoteReasonReason');

        await queryRunner.dropForeignKey('votes_reasons', 'FKVoteReasonVote');

        await queryRunner.dropTable('votes_reasons');
    }
}
