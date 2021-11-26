import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CreateCampaigns1637848787144 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'CAMPAIGNS',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isUnique: true,
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'group_id',
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
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        isNullable: false,
                        default: 'now()',
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
                        isNullable: true,
                        default: null,
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            'CAMPAIGNS',
            new TableForeignKey({
                name: 'FKCampaignGroup',
                referencedTableName: 'GROUPS',
                referencedColumnNames: ['id'],
                columnNames: ['group_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'CAMPAIGNS',
            new TableForeignKey({
                name: 'FKCampaignUser',
                referencedTableName: 'USERS',
                referencedColumnNames: ['id'],
                columnNames: ['user_id'],
                onDelete: 'SET NULL',
                onUpdate: 'SET NULL',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('CAMPAIGNS', 'FKCampaignUser');

        await queryRunner.dropForeignKey('CAMPAIGNS', 'FKCampaignGroup');

        await queryRunner.dropTable('CAMPAIGNS');
    }
}
