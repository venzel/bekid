import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CreateCampaignQueue1638194195075 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'CAMPAIGN_QUEUE',
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
            'CAMPAIGN_QUEUE',
            new TableForeignKey({
                name: 'FKCampaignQueueCampaign',
                referencedTableName: 'CAMPAIGNS',
                referencedColumnNames: ['id'],
                columnNames: ['campaign_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'CAMPAIGN_QUEUE',
            new TableForeignKey({
                name: 'FKCampaignQueueUser',
                referencedTableName: 'USERS',
                referencedColumnNames: ['id'],
                columnNames: ['user_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('CAMPAIGN_QUEUE', 'FKCampaignQueueUser');

        await queryRunner.dropForeignKey('CAMPAIGN_QUEUE', 'FKCampaignQueueCampaign');

        await queryRunner.dropTable('CAMPAIGN_QUEUE');
    }
}
