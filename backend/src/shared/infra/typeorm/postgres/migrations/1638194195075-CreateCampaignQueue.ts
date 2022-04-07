import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CreateCampaignQueue1638194195075 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'campaign_queue',
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
            'campaign_queue',
            new TableForeignKey({
                name: 'FKCampaignQueueCampaign',
                referencedTableName: 'campaigns',
                referencedColumnNames: ['id'],
                columnNames: ['campaign_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'campaign_queue',
            new TableForeignKey({
                name: 'FKCampaignQueueUser',
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                columnNames: ['user_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('campaign_queue', 'FKCampaignQueueUser');

        await queryRunner.dropForeignKey('campaign_queue', 'FKCampaignQueueCampaign');

        await queryRunner.dropTable('campaign_queue');
    }
}
