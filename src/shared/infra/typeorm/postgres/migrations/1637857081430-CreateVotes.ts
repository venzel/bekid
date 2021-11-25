import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CreateVotes1637857081430 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'votes',
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
            'votes',
            new TableForeignKey({
                name: 'VoteCampaign',
                referencedTableName: 'campaigns',
                referencedColumnNames: ['id'],
                columnNames: ['campaign_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'votes',
            new TableForeignKey({
                name: 'VoteEmotion',
                referencedTableName: 'emotions',
                referencedColumnNames: ['id'],
                columnNames: ['emotion_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'votes',
            new TableForeignKey({
                name: 'VoteUser',
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                columnNames: ['user_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('votes');
    }
}
