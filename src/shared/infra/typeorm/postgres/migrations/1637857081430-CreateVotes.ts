import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CreateVotes1637857081430 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'VOTES',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isUnique: true,
                        isPrimary: true,
                    },
                    {
                        name: 'campaign_id',
                        type: 'varchar',
                    },
                    {
                        name: 'emotion_id',
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
            'VOTES',
            new TableForeignKey({
                name: 'VoteCampaign',
                referencedTableName: 'CAMPAIGNS',
                referencedColumnNames: ['id'],
                columnNames: ['campaign_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'VOTES',
            new TableForeignKey({
                name: 'VoteEmotion',
                referencedTableName: 'EMOTIONS',
                referencedColumnNames: ['id'],
                columnNames: ['emotion_id'],
                onDelete: 'SET NULL',
                onUpdate: 'SET NULL',
            })
        );

        await queryRunner.createForeignKey(
            'VOTES',
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
        await queryRunner.dropTable('VOTES');
    }
}
